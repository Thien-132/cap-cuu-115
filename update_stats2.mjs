import fs from 'fs';

let lines = fs.readFileSync('d:/cap-cuu-115/src/routes/index.tsx', 'utf8').split('\n');
let statsIdx = lines.findIndex(l => l.includes('const stats = ['));

if (statsIdx >= 0) {
  const replaceStr = `  const [stats, setStats] = useState([
    { v: 10000, suffix: "+", label: "Khách hàng tin tưởng" },
    { v: 50, suffix: "+", label: "Xe cấp cứu hiện đại" },
    { v: 8, suffix: " phút", label: "Thời gian phản hồi TB" },
  ]);

  useEffect(() => {
    const updateStats = () => {
      const ambulancesCount = getAmbulances().length;
      const nursesCount = getNurses().length;
      
      setStats([
        { v: 10000, suffix: "+", label: "Khách hàng tin tưởng" },
        { v: ambulancesCount || 50, suffix: "+", label: "Xe cấp cứu hiện đại" },
        { v: nursesCount || 20, suffix: "+", label: "Điều dưỡng & Y bác sĩ" },
      ]);
    };
    
    updateStats();
    window.addEventListener('admin_store_update', updateStats);
    return () => window.removeEventListener('admin_store_update', updateStats);
  }, []);`;

  lines.splice(statsIdx, 5, replaceStr);
  
  // also inject import if needed
  for(let i=0; i<lines.length; i++) {
    if (lines[i].includes('import heroImg from')) {
      if (!lines.slice(0, i).some(l => l.includes('getAmbulances'))) {
        lines.splice(i, 0, 'import { getAmbulances, getNurses } from "@/lib/adminStore";\n');
      }
      break;
    }
  }

  fs.writeFileSync('d:/cap-cuu-115/src/routes/index.tsx', lines.join('\n'));
  console.log('Successfully replaced exact lines!');
} else {
  console.log('Not found');
}
