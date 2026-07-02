import fs from 'fs';
const files = ['bang-gia.tsx', 'lien-he.tsx', 'tin-tuc.tsx', 've-chung-toi.tsx'];
for (const file of files) {
  const p = 'd:/cap-cuu-115/src/routes/' + file;
  let text = fs.readFileSync(p, 'utf8');
  text = text.replace('import { CheckCircle2, CheckCircle2 } from "lucide-react";', 'import { CheckCircle2 } from "lucide-react";');
  text = text.replace("import { CheckCircle2, CheckCircle2 } from 'lucide-react';", "import { CheckCircle2 } from 'lucide-react';");
  fs.writeFileSync(p, text);
}
console.log('Fixed imports');
