import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, ChevronDown, FileText, Calendar, 
  Building2, Phone, Mail, Info, Download, 
  AlertTriangle, ArrowRight, ExternalLink, Printer 
} from 'lucide-react';

// --- DATA CONTENT START ---
const CIRCULAR_INFO = {
  date: "Verona, 20/01/2026",
  title: "OPERAZIONI DI CHIUSURA DI BILANCIO",
  recipient: "Spett.le Cliente",
};

// --- UTILS & FILE GENERATORS ---

/**
 * Genera e scarica un file (Excel o Word) basato su HTML.
 */
const downloadFile = (htmlContent: string, fileName: string, mimeType: string) => {
  const template = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; }
          .brand { font-size: 10pt; color: #555; font-weight: bold; text-transform: uppercase; margin-bottom: 5px; }
          .main-title { font-size: 16pt; color: #991b1b; font-weight: bold; text-align: center; margin-bottom: 20px; text-transform: uppercase; border-bottom: 2px solid #991b1b; }
          h1 { font-size: 14pt; color: #000; font-weight: bold; margin-top: 20px; background-color: #f3f4f6; padding: 5px; }
          h2 { font-size: 12pt; color: #991b1b; font-weight: bold; margin-top: 15px; }
          p { margin-bottom: 10px; text-align: justify; }
          ul { margin-bottom: 10px; }
          li { margin-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px; }
          th { background-color: #991b1b; color: white; border: 1px solid #000; padding: 5px; text-align: center; font-weight: bold; }
          td { border: 1px solid #000; padding: 5px; }
          .note-box { background-color: #ffffcc; border: 1px solid #eab308; padding: 10px; margin: 10px 0; font-size: 10pt; }
          .footer { margin-top: 50px; font-size: 9pt; color: #666; text-align: center; border-top: 1px solid #ccc; padding-top: 10px; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;
  
  const blob = new Blob([template], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const generateInventoryExcel = () => {
  const rows = Array(20).fill(0).map(() => 
    `<tr><td></td><td></td><td></td><td></td></tr>`
  ).join('');

  const content = `
    <div class="brand">BDZ Studio Associato - Anno 2026</div>
    <div class="main-title">Dettaglio Rimanenze Finali - 31.12.2025</div>
    <table>
      <thead>
        <tr>
          <th width="300">CATEGORIA E DESCRIZIONE BENI</th>
          <th width="100">QUANTITA'</th>
          <th width="120">VALORE UNITARIO</th>
          <th width="120">VALORE COMPLESSIVO</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="background-color: #eee; font-weight: bold;">MATERIE PRIME</td><td></td><td></td><td></td></tr>
        ${rows}
        <tr>
          <td colspan="3" class="text-right" style="font-weight: bold;">TOTALE A RIPORTARE</td>
          <td style="background-color: #ffffcc;"></td>
        </tr>
      </tbody>
    </table>
  `;
  downloadFile(content, "Inventario_2025_BDZ.xls", 'application/vnd.ms-excel');
};

const generateBankReconcilationExcel = () => {
  const rows = Array(15).fill(0).map(() => 
    `<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>`
  ).join('');

  const content = `
    <div class="brand">BDZ Studio Associato - Anno 2026</div>
    <div class="main-title">PROSPETTO RICONCILIAZIONE BANCARIA</div>
    <table>
      <thead>
        <tr>
          <th width="100">DATA</th>
          <th width="300">DESCRIZIONE OPERAZIONE</th>
          <th width="120">IMPORTO E/C (+)</th>
          <th width="120">IMPORTO CONTAB. (-)</th>
          <th width="120">DIFFERENZA</th>
          <th width="200">NOTE</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
  downloadFile(content, "Riconciliazione_Bancaria_BDZ.xls", 'application/vnd.ms-excel');
};

const generateAnomaliesExcel = () => {
  const rows = Array(15).fill(0).map(() => 
    `<tr><td></td><td></td><td></td><td></td><td></td></tr>`
  ).join('');

  const content = `
    <div class="brand">BDZ Studio Associato - Anno 2026</div>
    <div class="main-title">SEGNALAZIONE ANOMALIE CASSA</div>
    <table>
      <thead>
        <tr>
          <th width="100">DATA</th>
          <th width="120">SALDO CASSA</th>
          <th width="350">DESCRIZIONE ANOMALIA</th>
          <th width="150">OPERATORE</th>
          <th width="200">NOTE / AZIONI CORRETTIVE</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
  downloadFile(content, "Segnalazione_Anomalie_BDZ.xls", 'application/vnd.ms-excel');
};

const generateFullCircularWord = () => {
  const content = `
    <div class="brand">BDZ Studio Associato</div>
    <p style="text-align: right;">${CIRCULAR_INFO.date}</p>
    <div class="main-title">${CIRCULAR_INFO.title}</div>
    <p><strong>${CIRCULAR_INFO.recipient}</strong></p>

    <h1>INTRODUZIONE</h1>
    <p>Dopo aver registrato le ultime operazioni relative al 31/12 e prima di procedere alle scritture di assestamento, è necessario provvedere al controllo dei conti movimentati nell’esercizio.</p>
    <p>La quadratura formale del bilancio è il prerequisito per la correttezza sostanziale. Eventuali errori possono portare a sanzioni, errata rappresentazione dell'utile e difficoltà nell'accesso al credito.</p>

    <h1>A. OPERAZIONI ANTERIORI</h1>
    <h2>CASSA</h2>
    <p>Il conto cassa dovrà avere SEMPRE un saldo nella sezione DARE. Non è possibile che risulti un saldo negativo.</p>
    <div class="note-box"><strong>Attenzione:</strong> Il limite all'utilizzo del contante è fissato a 5.000€.</div>

    <h2>BANCA</h2>
    <p>Occorre verificare la registrazione degli interessi e procedere alla riconciliazione tra saldo contabile ed estratto conto.</p>

    <h2>CLIENTI E FORNITORI</h2>
    <p>Il totale dell'elenco clienti/fornitori deve conciliare con il saldo contabile di bilancio.</p>

    <h1>B. SCRITTURE DI ASSESTAMENTO</h1>
    <p>Per determinare l'esercizio di competenza, i costi e ricavi devono essere imputati indipendentemente dalla data finanziaria.</p>
    
    <h2>PASSAGGIO DI PROPRIETÀ (INCOTERMS)</h2>
    <table>
      <tr><th>Termine</th><th>Descrizione</th><th>Passaggio Proprietà</th></tr>
      <tr><td>EXW</td><td>Franco Fabbrica</td><td>Uscita dalla fabbrica</td></tr>
      <tr><td>FOB</td><td>Franco a bordo</td><td>Imbarco nave</td></tr>
      <tr><td>CIF</td><td>Cost Insurance Freight</td><td>Porto destinazione</td></tr>
      <tr><td>DDP</td><td>Reso Sdoganato</td><td>Consegna cliente</td></tr>
    </table>

    <h1>C. INVENTARIO MAGAZZINO</h1>
    <p>Le rimanenze al 31/12 devono essere valorizzate al costo di acquisto o al valore di realizzo (se minore). Vanno distinte in: Materie Prime, Sussidiarie, Consumo, Merci, Semilavorati, Prodotti Finiti.</p>

    <h1>D. MODIFICHE E VARIE</h1>
    <p><strong>Immobilizzazioni:</strong> Sono capitalizzabili solo i costi per l'acquisto o la costruzione di nuovi cespiti, o per l'incremento significativo della capacità.</p>
    <p><strong>Crediti:</strong> Le perdite su crediti sono deducibili fiscalmente solo se risultano da elementi certi e precisi.</p>

    <div class="footer">
      <p>Studio Associato BDZ - Viale A. Palladio, 42 - Verona<br/>Documento generato da Circolattiva</p>
    </div>
  `;
  
  downloadFile(content, "Circolare_Bilancio_2026_BDZ.doc", 'application/msword');
};

// --- INTERACTIVE COMPONENTS ---

const ExpandableCard = ({ title, children, type = 'info' }: { title: string, children?: React.ReactNode, type?: 'info' | 'warning' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const theme = type === 'warning' 
    ? { header: 'bg-amber-50 text-amber-900 hover:bg-amber-100', icon: 'text-amber-600', border: 'border-amber-200' }
    : { header: 'bg-slate-50 text-slate-800 hover:bg-slate-100', icon: 'text-bdz-red', border: 'border-gray-200' };

  return (
    <div className={`border rounded-lg overflow-hidden transition-all duration-300 my-5 ${isOpen ? 'shadow-md ring-1 ring-black/5' : 'shadow-sm'} ${theme.border}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 text-left transition-colors ${theme.header}`}
      >
        <div className="flex items-center gap-3">
            {type === 'warning' ? <AlertTriangle size={20} className={theme.icon}/> : <Info size={20} className={theme.icon}/>}
            <span className="font-bold text-sm md:text-base tracking-tight">{title}</span>
        </div>
        <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-5 bg-white border-t border-gray-100 text-sm text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-1">
            {children}
        </div>
      )}
    </div>
  );
};

const ActionBtn = ({ label, icon: Icon, action }: { label: string, icon: any, action?: () => void }) => (
  <button 
    onClick={action || (() => alert("Funzione non disponibile in questa demo."))}
    className="group inline-flex items-center gap-2 px-4 py-2 bg-white text-bdz-red text-xs font-bold uppercase tracking-wide rounded-full shadow-sm border border-red-100 hover:bg-bdz-red hover:text-white hover:border-bdz-red transition-all duration-200 mt-3 mb-1"
  >
    <Icon size={14} className="group-hover:scale-110 transition-transform"/> {label} <ArrowRight size={12} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
  </button>
);

// --- CHAPTERS DEFINITION ---

interface Chapter {
  id: string;
  title: string;
  content: React.ReactNode;
}

const chapters: Chapter[] = [
  {
    id: "intro",
    title: "Introduzione",
    content: (
      <div className="space-y-4">
        <p className="text-lg leading-relaxed text-gray-700">
          Dopo aver registrato le ultime operazioni relative al 31/12 e prima di procedere alle scritture di assestamento (ammortamento, rettifica e integrazione), è <strong>necessario provvedere al controllo dei conti movimentati nell’esercizio.</strong>
        </p>
        <p className="leading-relaxed text-gray-600">
          Stampato un bilancio di verifica, si deve verificare la congruità e la corretta collocazione di ciascun conto. Il totale di tutte le movimentazioni in DARE dello Stato Patrimoniale dovrà essere dello stesso importo di quelle in AVERE; le eventuali squadrature di bilancio dovranno essere rettificate.
        </p>
        
        <ExpandableCard title="Perché questo controllo è fondamentale?">
          <p>La quadratura formale del bilancio è il prerequisito per la correttezza sostanziale.</p>
          <p className="mt-2">Eventuali errori di imputazione possono portare a:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Sanzioni in caso di controlli fiscali.</li>
            <li>Rappresentazione errata dell'utile d'esercizio.</li>
            <li>Difficoltà nell'accesso al credito bancario (rating peggiorativo).</li>
          </ul>
        </ExpandableCard>
      </div>
    )
  },
  {
    id: "section-a",
    title: "A. Operazioni Anteriori",
    content: (
      <div className="space-y-8">
        <section>
          <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">CASSA</h3>
                <p className="mb-2 text-gray-700">Il conto cassa dovrà avere, per tutti i giorni dell’anno, <strong>SEMPRE</strong> un saldo nella sezione DARE.</p>
            </div>
            <div className="hidden md:block">
                 <ActionBtn 
                    icon={Download} 
                    label="Scarica Modulo Anomalie Excel" 
                    action={generateAnomaliesExcel}
                 />
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-800 rounded-r-lg mt-2">
            <strong>Attenzione:</strong> Non è possibile che risulti un saldo negativo (AVERE). Il saldo deve coincidere con i valori reali. Limite utilizzo contanti attuale: <strong>5.000€</strong>.
          </div>

          <ExpandableCard title="Approfondimento Normativa Antiriciclaggio" type="warning">
             Le sanzioni per il superamento della soglia del contante (5.000€) vanno da un minimo di 1.000€ a un massimo di 50.000€. Si ricorda che il frazionamento artificioso di un pagamento unitario per eludere la soglia è vietato e sanzionabile.
          </ExpandableCard>
        </section>

        <section>
          <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">BANCA</h3>
          <p className="mb-3 text-gray-700">Occorre verificare la registrazione degli interessi e procedere alla <strong>riconciliazione</strong> tra saldo contabile ed estratto conto.</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
            <li>Aggiungere importi accreditati ma non rilevati (bonifici clienti).</li>
            <li>Detrarre disposizioni non ancora addebitate (assegni emessi).</li>
            <li>Non operare compensazioni tra banche attive e passive.</li>
          </ul>
          <ActionBtn 
            icon={Download} 
            label="Scarica Riconciliazione Excel" 
            action={generateBankReconcilationExcel}
          />
        </section>

        <section>
          <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">CLIENTI E FORNITORI</h3>
          <p className="mb-3 text-gray-700">Il totale dell'elenco clienti/fornitori deve conciliare con il saldo contabile di bilancio.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">Abbuoni Passivi</h4>
              <p className="text-sm text-gray-500 mb-2">Se restano aperti piccoli importi clienti:</p>
              <code className="block bg-gray-50 p-2 text-xs rounded text-gray-600 border font-mono">Abbuoni passivi (DARE) <br/>a Crediti v/Clienti (AVERE)</code>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">Anticipi Fornitori</h4>
              <p className="text-sm text-gray-500 mb-2">Pagamenti senza fattura ricevuta:</p>
              <code className="block bg-gray-50 p-2 text-xs rounded text-gray-600 border font-mono">Anticipi a fornitori (DARE) <br/>a Debiti v/Fornitori (AVERE)</code>
            </div>
          </div>
        </section>
        
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">ERARIO E INPS/INAIL</h3>
            <p className="mb-2 text-gray-700">Il saldo dei conti deve corrispondere alle liquidazioni periodiche e alle dichiarazioni annuali.</p>
            <div className="grid sm:grid-cols-3 gap-3 mt-4">
                 <div className="p-3 bg-gray-50 rounded border text-center">
                    <span className="block font-bold text-bdz-red">IVA</span>
                    <span className="text-xs text-gray-500">Saldo Liq. Periodica</span>
                 </div>
                 <div className="p-3 bg-gray-50 rounded border text-center">
                    <span className="block font-bold text-bdz-red">INPS</span>
                    <span className="text-xs text-gray-500">Modello F24 Gennaio</span>
                 </div>
                 <div className="p-3 bg-gray-50 rounded border text-center">
                    <span className="block font-bold text-bdz-red">INAIL</span>
                    <span className="text-xs text-gray-500">Autoliquidazione</span>
                 </div>
            </div>
        </section>
      </div>
    )
  },
  {
    id: "section-b",
    title: "B. Scritture di Assestamento",
    content: (
      <div className="space-y-8">
        <div className="prose max-w-none text-gray-700">
           <p className="mb-4">Per determinare l'esercizio di competenza (art. 2423-bis c.c.), i costi e ricavi devono essere imputati indipendentemente dalla data finanziaria.</p>
           
           <ExpandableCard title="Guida Rapida: Principio di Competenza">
             <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-2">Oggetto</th>
                            <th className="px-4 py-2">Momento Rilevante</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-4 py-2 font-medium">Beni mobili</td><td className="px-4 py-2">Consegna o spedizione (DDT)</td></tr>
                        <tr><td className="px-4 py-2 font-medium">Beni immobili</td><td className="px-4 py-2">Data atto notarile</td></tr>
                        <tr><td className="px-4 py-2 font-medium">Servizi</td><td className="px-4 py-2">Ultimazione prestazione</td></tr>
                    </tbody>
                </table>
             </div>
           </ExpandableCard>
        </div>

        <section>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-xl font-serif text-bdz-red font-bold">Passaggio di Proprietà (Incoterms)</h3>
                <ActionBtn 
                    icon={ExternalLink} 
                    label="Glossario Online" 
                    action={() => window.open('https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/', '_blank')}
                />
            </div>
            <p className="mb-4 text-sm text-gray-600">Rilevante per acquisti/vendite a cavallo d'anno.</p>
            <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 font-bold text-gray-600">
                        <tr>
                            <th className="p-3 text-left">Termine</th>
                            <th className="p-3 text-left">Descrizione</th>
                            <th className="p-3 text-left">Passaggio Proprietà</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-red-50/50 transition-colors"><td className="p-3 font-mono text-bdz-red font-bold">EXW</td><td>Franco Fabbrica</td><td>All'uscita dalla fabbrica</td></tr>
                        <tr className="hover:bg-red-50/50 transition-colors"><td className="p-3 font-mono text-bdz-red font-bold">FOB</td><td>Franco a bordo</td><td>All'imbarco sulla nave</td></tr>
                        <tr className="hover:bg-red-50/50 transition-colors"><td className="p-3 font-mono text-bdz-red font-bold">CIF</td><td>Cost Insurance Freight</td><td>All'arrivo al porto destinazione</td></tr>
                        <tr className="hover:bg-red-50/50 transition-colors"><td className="p-3 font-mono text-bdz-red font-bold">DDP</td><td>Reso Sdoganato</td><td>Alla consegna al cliente</td></tr>
                    </tbody>
                </table>
            </div>
            <ExpandableCard title="Dettaglio: DDP vs EXW">
                <p><strong>EXW (Ex Works):</strong> Il compratore si fa carico di tutti i costi e rischi dal momento in cui la merce lascia i locali del venditore.</p>
                <p className="mt-2"><strong>DDP (Delivered Duty Paid):</strong> Il venditore si assume tutti i costi e rischi, inclusi dazi e imposte, fino alla consegna nel luogo convenuto.</p>
            </ExpandableCard>
        </section>

        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">Ratei e Risconti</h3>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="border border-blue-100 rounded-xl p-5 bg-blue-50/50 hover:bg-blue-50 transition-colors">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2"><ArrowRight size={16}/> Risconti (Anticipati)</h4>
                    <p className="text-sm mt-2 text-blue-800">Quote di costi/ricavi già pagati/incassati ma di competenza futura.</p>
                </div>
                <div className="border border-green-100 rounded-xl p-5 bg-green-50/50 hover:bg-green-50 transition-colors">
                    <h4 className="font-bold text-green-900 flex items-center gap-2"><ArrowRight size={16}/> Ratei (Posticipati)</h4>
                    <p className="text-sm mt-2 text-green-800">Quote maturati nell'anno ma non ancora pagati/incassati.</p>
                </div>
            </div>
        </section>
      </div>
    )
  },
  {
    id: "section-c",
    title: "C. Inventario Magazzino",
    content: (
      <div className="space-y-6">
        <p className="text-gray-700">Le rimanenze al 31/12 devono essere valorizzate al <strong>costo di acquisto</strong> o al <strong>valore di realizzo</strong> (se minore). Vanno distinte in:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Materie Prime', 'Sussidiarie', 'Consumo', 'Merci', 'Semilavorati', 'Prodotti Finiti'].map((item) => (
                <div key={item} className="bg-white p-3 rounded border text-center font-medium shadow-sm hover:shadow-md hover:border-bdz-red hover:text-bdz-red transition-all cursor-default">
                    {item}
                </div>
            ))}
        </div>
        <div className="bg-red-50 p-5 rounded-lg border border-red-100">
            <h4 className="text-bdz-red font-bold flex items-center gap-2">
                <FileText size={20}/> Obblighi Fiscali
            </h4>
            <p className="text-sm mt-2 text-gray-700 leading-relaxed">
                Nell'inventario deve essere riportata la consistenza analitica per categorie omogenee. L'assenza della distinta analitica permette all'Amministrazione Finanziaria di procedere ad accertamento induttivo.
            </p>
            <ActionBtn 
                icon={Download} 
                label="Scarica Inventario Excel" 
                action={generateInventoryExcel}
            />
        </div>
      </div>
    )
  },
  {
      id: "section-d",
      title: "D. Modifiche e Varie",
      content: (
          <div className="space-y-6">
              <section>
                  <h3 className="text-xl font-serif text-bdz-red mb-2 font-bold">Immobilizzazioni</h3>
                  <p className="text-gray-700 mb-2">Sono capitalizzabili solo i costi sostenuti per l'acquisto o la costruzione di nuovi cespiti, o per l'incremento significativo della capacità/vita utile di quelli esistenti.</p>
                  <ExpandableCard title="Ammortamento e Manutenzione">
                    <p className="mb-2">Le spese di manutenzione ordinaria sono deducibili nel limite del 5% del costo complessivo di tutti i beni materiali ammortizzabili.</p>
                    <p>L'eccedenza è deducibile in quote costanti nei 5 esercizi successivi.</p>
                  </ExpandableCard>
              </section>
              <section>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                     <h3 className="text-xl font-serif text-bdz-red mb-2 font-bold">Crediti e Perdite</h3>
                  </div>
                  <p className="text-gray-700">
                      Le perdite su crediti sono deducibili fiscalmente solo se risultano da <strong>elementi certi e precisi</strong> (es. procedure concorsuali).
                  </p>
                  <p className="mt-3 text-sm bg-gray-100 p-3 rounded border border-gray-200 text-gray-600">
                      Il fondo svalutazione crediti è deducibile allo 0,5% del valore nominale dei crediti (fino al 5% totale).
                  </p>
              </section>
          </div>
      )
  }
];
// --- DATA CONTENT END ---

// --- COMPONENTS ---

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
  <header className="sticky top-0 z-40 w-full bg-white shadow-md border-t-4 border-bdz-red no-print">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-bdz-dark hover:bg-gray-100 rounded-md">
          <Menu size={24} />
        </button>
        <div className="flex flex-col">
          <span className="text-2xl font-serif font-bold tracking-tight text-bdz-red leading-none">BDZ</span>
          <span className="text-[0.65rem] tracking-widest text-gray-500 uppercase">Studio Associato</span>
        </div>
      </div>
      <div className="hidden sm:block text-right">
        <h1 className="text-sm font-semibold text-gray-800">{CIRCULAR_INFO.title}</h1>
        <p className="text-xs text-gray-500">{CIRCULAR_INFO.date}</p>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-bdz-dark text-white py-12 mt-12 border-b-8 border-bdz-red print-full-width">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-lg font-serif font-bold mb-4 text-white">Studio Associato BDZ</h3>
          <p className="text-gray-400 mb-1">Basso - De Bortoli - Zambelli</p>
          <p className="text-gray-400">Consulenza Aziendale e del Lavoro</p>
        </div>
        <div className="space-y-2">
           <div className="flex items-center gap-2 text-gray-300">
             <Building2 size={16} /> <span>Viale A. Palladio, 42 - 37138 Verona</span>
           </div>
           <div className="flex items-center gap-2 text-gray-300">
             <Phone size={16} /> <span>+39 045 577694</span>
           </div>
           <div className="flex items-center gap-2 text-gray-300">
             <Mail size={16} /> <span>info@bdzassociati.it</span>
           </div>
        </div>
        <div className="text-gray-400 text-xs leading-relaxed">
          <p>C.F. e P. IVA 03486640232</p>
          <p>www.bdzassociati.it</p>
          <p className="mt-4 opacity-50">&copy; {new Date().getFullYear()} Tutti i diritti riservati.</p>
        </div>
      </div>
    </div>
  </footer>
);

const Sidebar = ({ 
  isOpen, 
  close, 
  activeSection 
}: { 
  isOpen: boolean; 
  close: () => void;
  activeSection: string;
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Offset for fixed header
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    if (window.innerWidth < 1024) close();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={close}
        />
      )}
      
      {/* Sidebar Panel */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:shadow-none lg:z-0 no-print
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 flex justify-between items-center lg:hidden border-b">
          <span className="font-bold text-gray-700">Indice Circolare</span>
          <button onClick={close} className="p-2 text-gray-500 hover:text-red-600">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto max-h-full">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => scrollTo(chapter.id)}
              className={`
                w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group
                ${activeSection === chapter.id 
                  ? 'bg-red-50 text-bdz-red font-bold shadow-sm ring-1 ring-red-100' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <span>{chapter.title}</span>
              {activeSection === chapter.id && <ChevronRight size={16} />}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-50 border-t border-gray-100 lg:hidden">
          <p className="text-xs text-center text-gray-400">Scorri per leggere</p>
        </div>
      </aside>
    </>
  );
};

// --- MAIN APP ---

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("intro");

  // Intersection Observer to detect active section while scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' } 
    );

    chapters.forEach((chapter) => {
      const element = document.getElementById(chapter.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Header toggleSidebar={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 container mx-auto max-w-7xl">
        <Sidebar 
          isOpen={isSidebarOpen} 
          close={() => setIsSidebarOpen(false)} 
          activeSection={activeSection}
        />

        <main className="flex-1 w-full lg:px-8 py-8 print-full-width">
          {/* Circular Cover / Title Area */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8 text-center print:shadow-none print:border-none">
            <div className="w-24 h-1 bg-bdz-red mx-auto mb-6"></div>
            <p className="text-gray-500 mb-2">{CIRCULAR_INFO.date}</p>
            <p className="text-gray-600 font-medium mb-6">{CIRCULAR_INFO.recipient}</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-bdz-dark mb-4 leading-tight">
              {CIRCULAR_INFO.title}
            </h2>
            <div className="flex justify-center gap-2 mt-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-bdz-red border border-red-100">
                    <Calendar className="w-3 h-3 mr-1" /> Anno 2026
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                    <FileText className="w-3 h-3 mr-1" /> Bilancio
                </span>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {chapters.map((chapter) => (
              <article 
                key={chapter.id} 
                id={chapter.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10 scroll-mt-24 transition-all hover:shadow-md print:shadow-none print:break-inside-avoid"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <div className="w-1.5 h-8 bg-bdz-red rounded-full"></div>
                  <h2 className="text-2xl font-serif font-bold text-gray-800">
                    {chapter.title}
                  </h2>
                </div>
                <div className="prose prose-slate prose-headings:font-serif prose-headings:text-bdz-dark max-w-none">
                  {chapter.content}
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-12 text-center no-print space-y-4 md:space-y-0 md:flex md:justify-center md:gap-4">
            <button 
                onClick={generateFullCircularWord}
                className="w-full md:w-auto px-6 py-3 bg-white border border-blue-200 text-blue-700 rounded-lg shadow-sm hover:bg-blue-50 transition-colors font-medium text-sm flex items-center justify-center gap-2"
            >
                <FileText size={18} /> Scarica Circolare Word (.doc)
            </button>
            
            <button 
                onClick={() => window.print()}
                className="w-full md:w-auto px-6 py-3 bg-bdz-red border border-red-700 text-white rounded-lg shadow-sm hover:bg-red-800 transition-colors font-medium text-sm flex items-center justify-center gap-2"
            >
                <Printer size={18} /> Stampa / Salva come PDF
            </button>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;