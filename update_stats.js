const fs = require('fs');
let content = fs.readFileSync('d:/cap-cuu-115/src/routes/index.tsx', 'utf8');

if (!content.includes('import { getAmbulances, getNurses }')) {
  content = content.replace('import heroImg from', 'import { getAmbulances, getNurses } from "@/lib/adminStore";\n\nimport heroImg from');
}

const targetStr = `  const stats = [
    { v: 10000, suffix: "+", label: "Khách hàng tin tưởng" },
    { v: 50, suffix: "+", label: "Xe cấp cứu hiện đại" },
    { v: 8, suffix: " phút", label: "Thời gian phản hồi TB" },
  ];`;

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

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replaceStr);
  fs.writeFileSync('d:/cap-cuu-115/src/routes/index.tsx', content);
  console.log('Successfully updated stats in index.tsx');
} else {
  console.log('Target string not found');
}
