
// Cards statistiques enrichies
const stats = [
  { label: 'Utilisateurs actifs', value: 128, color: '#1a237e' },
  { label: 'Boutiques', value: 34, color: '#3949ab' },
  { label: 'Équipements', value: 512, color: '#00bcd4' },
  { label: 'Incidents ce mois', value: 7, color: '#d32f2f' },
  { label: 'CA total (€)', value: '12 300', color: '#43a047' },
  { label: 'Devis en attente', value: 5, color: '#ffa000' },
];

// Données fictives pour courbe et camembert
const lineChartPoints = "0,100 50,80 100,60 150,90 200,40 250,70 300,30 350,60 400,20";
const pieData = [
  { label: 'PV', value: 40, color: '#3949ab' },
  { label: 'Batteries', value: 25, color: '#00bcd4' },
  { label: 'Onduleurs', value: 20, color: '#43a047' },
  { label: 'Régulateurs', value: 15, color: '#ffa000' },
];

// Simple camembert SVG
function SimplePieChart({ data, cx = 60, cy = 60, r = 50 }) {
  let total = data.reduce((sum, d) => sum + d.value, 0);
  let angle = 0;
  let paths = [];
  data.forEach((d, i) => {
    let a0 = angle;
    let a1 = angle + (d.value / total) * 2 * Math.PI;
    let x0 = cx + r * Math.cos(a0);
    let y0 = cy + r * Math.sin(a0);
    let x1 = cx + r * Math.cos(a1);
    let y1 = cy + r * Math.sin(a1);
    let largeArc = a1 - a0 > Math.PI ? 1 : 0;
    paths.push(
      <path
        key={d.label}
        d={`M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${largeArc} 1 ${x1},${y1} Z`}
        fill={d.color}
        stroke="#fff"
        strokeWidth="1"
      />
    );
    angle = a1;
  });
  return (
    <svg width="120" height="120">
      {paths}
    </svg>
  );
}

export default function StatsPage() {
  return (
    <div>
      <h2 style={{ color: '#1a237e', marginBottom: '1.5rem' }}>Statistiques générales</h2>
      {/* Cards */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        marginBottom: '2.5rem',
        flexWrap: 'wrap'
      }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: s.color,
            color: '#fff',
            borderRadius: '10px',
            minWidth: 160,
            padding: '1.2rem 1.5rem',
            boxShadow: '0 2px 8px rgba(30,36,90,0.07)',
            flex: '1 1 180px'
          }}>
            <div style={{ fontSize: 28, fontWeight: 'bold' }}>{s.value}</div>
            <div style={{ fontSize: 15 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Courbe et camembert */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        marginBottom: '2.5rem'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '2rem',
          boxShadow: '0 1px 8px rgba(30,36,90,0.07)',
          flex: 2,
          minWidth: 320
        }}>
          <h3 style={{ color: '#3949ab', marginBottom: '1rem' }}>Évolution des installations</h3>
          <svg width="100%" height="120" viewBox="0 0 400 120">
            <polyline
              fill="none"
              stroke="#3949ab"
              strokeWidth="4"
              points={lineChartPoints}
            />
            <circle cx="200" cy="40" r="6" fill="#3949ab" />
          </svg>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '2rem',
          boxShadow: '0 1px 8px rgba(30,36,90,0.07)',
          flex: 1,
          minWidth: 180,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h3 style={{ color: '#3949ab', marginBottom: '1rem' }}>Répartition équipements</h3>
          <SimplePieChart data={pieData} />
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 10 }}>
            {pieData.map(d => (
              <li key={d.label} style={{ color: d.color, fontWeight: 'bold', fontSize: 13 }}>
                <span style={{
                  display: 'inline-block',
                  width: 10, height: 10, borderRadius: '50%', background: d.color, marginRight: 8
                }}></span>
                {d.label} ({d.value}%)
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section alertes ou top équipements */}
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '2rem',
        boxShadow: '0 1px 8px rgba(30,36,90,0.07)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#3949ab', marginBottom: '1rem' }}>Alertes récentes</h3>
        <ul>
          <li>Incident batterie - Installation #1023 (signalé il y a 2h)</li>
          <li>Panneau PV en maintenance - Installation #1008 (signalé hier)</li>
          <li>Stock faible sur onduleur - Boutique “Énergie+”</li>
        </ul>
      </div>
    </div>
  );
}
