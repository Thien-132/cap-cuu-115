import fs from 'fs';

let indexStr = fs.readFileSync('d:/cap-cuu-115/src/routes/dieu-duong-tai-nha.tsx', 'utf8');
let lines = indexStr.split('\n');

const imports = `import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { BookingModal } from '@/components/common/BookingModal';
import { FloatingActions } from '@/components/common/FloatingActions';
import { BackToTop } from '@/components/common/BackToTop';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Field } from '@/components/common/Field';
import { InfoCard } from '@/components/common/InfoCard';
`;

lines.splice(31, 0, ...imports.split('\n'));

function findFunc(name, arr) {
  return arr.findIndex(l => l.startsWith('function ' + name + '(') || l.startsWith('/* ---------- ' + name + ' ---------- */') || l.startsWith('function ' + name + ' '));
}

let currentLines = [...lines];

function removeFunc(name) {
  const start = findFunc(name, currentLines);
  if (start === -1) return;
  let end = -1;
  for (let i = start + 1; i < currentLines.length; i++) {
    if (currentLines[i].startsWith('function ') || currentLines[i].startsWith('/* ---------- ')) {
      end = i;
      break;
    }
  }
  if (end === -1) end = currentLines.length; // till EOF
  currentLines.splice(start, end - start);
}

// Remove the extracted components
removeFunc('Navbar');
removeFunc('Field');
removeFunc('InfoCard');
removeFunc('Footer');
removeFunc('FloatingActions');
removeFunc('BackToTop');
removeFunc('BookingModal');
removeFunc('SectionHeading');

// Add NAV prop to Navbar and Footer
let indexComponentStart = findFunc('HomeNursing', currentLines);
for(let i=indexComponentStart; i<currentLines.length; i++) {
  if (currentLines[i].includes('<Navbar onOpenBooking')) {
    currentLines[i] = currentLines[i].replace('<Navbar ', '<Navbar navItems={NAV} subtitle="Điều dưỡng tại nhà" ');
  }
  if (currentLines[i].includes('<Footer />')) {
    currentLines[i] = currentLines[i].replace('<Footer />', '<Footer navItems={NAV} />');
  }
}

fs.writeFileSync('d:/cap-cuu-115/src/routes/dieu-duong-tai-nha.tsx', currentLines.join('\n'));
console.log('Modified dieu-duong-tai-nha.tsx successfully.');
