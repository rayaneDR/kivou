import fs from 'node:fs';
import path from 'node:path';
import {randomUUID} from 'node:crypto';

export function text(value, label, max) {
  if (typeof value !== 'string' || !value.trim() || value.length > max) throw new Error(`${label} must contain 1–${max} characters.`);
  return value.trim();
}

export class Store {
  constructor(root) {
    this.root = path.resolve(root);
    fs.mkdirSync(this.root, {recursive:true});
    this.file = path.join(this.root, 'workspace.json');
    this.state = {schema:1, memory:'', missions:[]};
    if (fs.existsSync(this.file)) {
      const stat = fs.lstatSync(this.file);
      if (stat.isSymbolicLink() || stat.size > 20_000_000) throw new Error('Workspace file is linked or too large; preserve it and choose another data folder.');
      try {
        const value = JSON.parse(fs.readFileSync(this.file, 'utf8'));
        if (value.schema !== 1 || typeof value.memory !== 'string' || value.memory.length > 8000 || !Array.isArray(value.missions) || value.missions.some(m => !m || typeof m.id !== 'string' || !Array.isArray(m.messages))) throw new Error();
        this.state = value;
      } catch { throw new Error('Saved workspace could not be read. The original file is preserved; restore a backup before continuing.'); }
    }
    let changed = false;
    for (const mission of this.state.missions) if (mission.status === 'running') {
      mission.status = 'interrupted'; mission.error = 'The previous run stopped before completion. Saved work remains available; send another message to continue.';
      for (const receipt of mission.receipts || []) if (receipt.status === 'running') receipt.status = 'interrupted';
      changed = true;
    }
    if (changed) this.save();
  }
  save() {
    const temp = path.join(this.root, '.workspace-' + randomUUID() + '.tmp');
    try { fs.writeFileSync(temp, JSON.stringify(this.state), {flag:'wx'}); fs.renameSync(temp, this.file); }
    finally { if (fs.existsSync(temp)) fs.unlinkSync(temp); }
  }
  snapshot() { return structuredClone(this.state); }
  memory(value) {
    if (typeof value !== 'string' || value.length > 8000) throw new Error('Memory is limited to 8,000 characters.');
    this.state.memory = value; this.save();
  }
  mission(id) {
    const item = this.state.missions.find(m => m.id === id);
    if (!item) throw new Error('Mission not found.');
    return item;
  }
  create(title) {
    if (this.state.missions.length >= 500) throw new Error('This preview holds 500 missions. Export your work before using another data folder.');
    const item = {id:randomUUID(), title:text(title,'Mission name',100), createdAt:new Date().toISOString(), status:'draft', messages:[], receipts:[], error:null};
    this.state.missions.unshift(item); this.save(); return structuredClone(item);
  }
}
