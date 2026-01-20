import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, ChevronDown, FileText, Calendar, 
  Building2, Phone, Mail, Info, Download, 
  AlertTriangle, ArrowRight, ExternalLink
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
          Dopo aver registrato le ultime operazioni relative al 31/12 e prima di procedere alle scritture di assestamento (ammortamento, rettifica e integrazione), è <strong>necessario provvedere al controllo dei conti movimentati nell'esercizio.</strong>
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
        {/* CASSA */}
        <section>
          <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">CASSA</h3>
                <p className="mb-2 text-gray-700">Il conto cassa dovrà avere, per tutti i giorni dell'anno, <strong>SEMPRE</strong> un saldo nella sezione DARE.</p>
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

        {/* BANCA */}
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

        {/* CLIENTI */}
        <section>
          <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">CLIENTI E FORNITORI</h3>
          <p className="mb-3 text-gray-700">Il totale dell'elenco clienti/fornitori deve conciliare con il saldo contabile di bilancio.</p>
          
          <ExpandableCard title="Criterio di Valutazione Crediti/Debiti (D.lgs 139/2015)">
            <p>Il D.lgs. 139/2015 ha modificato il criterio di valutazione dei crediti/debiti che è ora corrispondente al criterio del <strong>costo ammortizzato</strong> (salvo l'applicazione del valore nominale per il bilancio delle aziende minori cosiddetto abbreviato: max attivo 5.5Ml, max ricavi 11 Ml).</p>
            <p className="mt-2">È importante valutare se ci sono in contabilità crediti/debiti di durata superiore a 12 mesi e che incorporano una SIGNIFICATIVA componente finanziaria. In questo caso è necessario calcolare il tasso di interesse effettivo.</p>
          </ExpandableCard>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
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

        {/* FORNITORI */}
        <section>
          <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">FORNITORI</h3>
          <p className="mb-3 text-gray-700">Il totale dell'elenco dei fornitori da pagare dovrà conciliare con il saldo contabile di bilancio ed essere sempre maggiore nella sezione AVERE.</p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-sm text-blue-800 rounded-r-lg">
            Se risulta nell'elenco fornitori un saldo nella sezione DARE dovuto ad anticipi per i quali non si è ricevuta la relativa fattura, si dovrà stornare quell'anticipo imputandolo al conto "anticipi a fornitori".
          </div>
        </section>
        
        {/* MUTUI E FINANZIAMENTI */}
        <section>
          <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">MUTUI O FINANZIAMENTI CON IPOTECA</h3>
          <p className="mb-2 text-gray-700">I debiti con garanzia reale (mutui, o finanziamenti con ipoteca) devono essere distintamente indicati in una apposita voce del bilancio.</p>
          <ExpandableCard title="Costi di transazione iniziali">
            <p>I costi di transazione iniziali sostenuti per ottenere eventuali finanziamenti (es. sp. Istruttoria, imposta sostitutiva…) devono essere rilevati tra i <strong>risconti attivi</strong>.</p>
          </ExpandableCard>
        </section>

        {/* ERARIO C/IVA */}
        <section>
          <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">ERARIO C/IVA</h3>
          <p className="text-gray-700">Il debito o credito del conto "erario c/IVA" risultante dal bilancio al 31/12 deve corrispondere a quanto è stato effettivamente liquidato per l'ultimo trimestre (o mese se la liquidazione è mensile).</p>
        </section>

        {/* INPS */}
        <section>
          <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">INPS</h3>
          <p className="text-gray-700">Il saldo AVERE del conto INPS dovrà corrispondere all'ammontare netto da versare a gennaio, con modello F24, come risultante dal modello UNI-E-MENS RIEPILOGATIVO.</p>
        </section>

        {/* INAIL */}
        <section>
          <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">INAIL</h3>
          <p className="mb-2 text-gray-700">Il saldo AVERE del conto INAIL dovrà corrispondere all'importo presunto da versare sulle retribuzioni relative all'esercizio in chiusura.</p>
          <p className="text-sm text-gray-600">In bilancio occorre rilevare la spesa presunta per la quota INAIL di competenza dell'anno di bilancio.</p>
        </section>

        {/* ERARIO C/RITENUTE */}
        <section>
          <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">ERARIO C/ RITENUTE A DEBITO</h3>
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-bold text-gray-800 mb-2">Verso Dipendenti</h4>
              <p className="text-sm text-gray-600">Dovrà risultare, nella sezione AVERE del conto, il debito per l'IRPEF sulle retribuzioni di dicembre. L'importo sarà poi versato entro il giorno 16 gennaio.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-bold text-gray-800 mb-2">Verso Altri Soggetti</h4>
              <p className="text-sm text-gray-600">Contiene le ritenute operate nel mese di dicembre sui compensi quali parcelle professionali, compensi amministratori… da versare entro il 16 gennaio.</p>
            </div>
          </div>
        </section>

        {/* DIPENDENTI C/RETRIBUZIONI */}
        <section>
          <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">DIPENDENTI C/RETRIBUZIONI</h3>
          <p className="text-gray-700">Dal saldo di questo conto (AVERE) dovrà risultare l'importo netto delle retribuzioni relative a dicembre che sono da liquidare entro il giorno 12 di gennaio.</p>
        </section>

        {/* ACCONTI IRAP/IRES */}
        <section>
          <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">ACCONTI IRAP/IRES</h3>
          <p className="mb-2 text-gray-700">Il saldo di questo conto (DARE) deve corrispondere alla somma dei versamenti effettuati in acconto per IRAP/IRES a giugno/settembre e novembre dell'anno di bilancio.</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>Codici tributo acconti IRES: <code className="bg-gray-100 px-1">2001 - 2002</code></li>
            <li>Codici tributo acconti IRAP: <code className="bg-gray-100 px-1">3812 - 3813</code></li>
          </ul>
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

           <ExpandableCard title="OIC 34 - Ricavi e Unità Elementari di Contabilizzazione" type="warning">
             <p className="mb-2">Nel corso del 2023 l'organismo italiano di contabilità ha rinnovato il principio contabile OIC34 che riguarda i RICAVI.</p>
             <p className="mb-2">La novità più rilevante interessa i bilanci ordinari (imprese con ricavi superiori a 5,5ML, attivo 11ML o 50 dipendenti) riguarda l'identificazione e la valorizzazione delle <strong>"UNITA' ELEMENTARI DI CONTABILIZZAZIONE"</strong>.</p>
             <p>Devono essere trattati separatamente i singoli beni, servizi o altre prestazioni che attraverso il contratto sono promesse al cliente.</p>
           </ExpandableCard>
        </div>

        {/* PASSAGGIO DI PROPRIETÀ */}
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

        {/* FATTURE DA RICEVERE/EMETTERE */}
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">Fatture da Ricevere e da Emettere</h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-2">Fatture da Ricevere</h4>
                    <p className="text-sm text-blue-800 mb-2">Acquisto di merci ricevute entro il 31/12, ma per le quali non è pervenuta la relativa fattura:</p>
                    <code className="block bg-white p-2 text-xs rounded text-gray-700 border">Merci c/acquisti<br/>a Fornitori per fatt. da ric.</code>
                </div>
                <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-900 mb-2">Fatture da Emettere</h4>
                    <p className="text-sm text-green-800 mb-2">Vendita di merci la cui consegna o spedizione sia avvenuta entro il 31/12:</p>
                    <code className="block bg-white p-2 text-xs rounded text-gray-700 border">Clienti per fatture da emett.<br/>a Merci c/vendite</code>
                </div>
            </div>
        </section>

        {/* RATEI E RISCONTI */}
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">Ratei e Risconti</h3>
            
            <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3">RISCONTI (Anticipati)</h4>
                <p className="text-gray-700 mb-3">Quote di costi già pagati o di ricavi già incassati nell'esercizio che però sono di competenza dell'esercizio successivo.</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-blue-100 rounded-xl p-5 bg-blue-50/50">
                        <h5 className="font-bold text-blue-900 mb-2">Risconto Attivo</h5>
                        <p className="text-sm text-blue-800 mb-3">Quota di costo già sostenuto ma di competenza del successivo esercizio (es. premio di assicurazione):</p>
                        <code className="block bg-white p-2 text-xs rounded">Risconti attivi<br/>a Assicurazioni</code>
                        <div className="mt-3 text-xs text-blue-700">
                            <strong>Esempi:</strong>
                            <ul className="list-disc pl-4 mt-1">
                                <li>Quote di interessi passivi addebitati anticipatamente</li>
                                <li>Quote di locazioni passive addebitate anticipatamente</li>
                                <li>Quote di premi di assicurazione</li>
                                <li>Quote di maxi canoni iniziali dei leasing</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border border-green-100 rounded-xl p-5 bg-green-50/50">
                        <h5 className="font-bold text-green-900 mb-2">Risconto Passivo</h5>
                        <p className="text-sm text-green-800 mb-3">Quota di ricavo già incassato ma di competenza dell'esercizio successivo (es. affitto attivo anticipato):</p>
                        <code className="block bg-white p-2 text-xs rounded">Affitti attivi<br/>a Risconti passivi</code>
                        <div className="mt-3 text-xs text-green-700">
                            <strong>Esempi:</strong>
                            <ul className="list-disc pl-4 mt-1">
                                <li>Quote di interessi attivi addebitati anticipatamente</li>
                                <li>Quote di locazioni attive fatturate in anticipo</li>
                                <li>Canoni periodici pagati in anticipo</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-bold text-gray-800 mb-3">RATEI (Posticipati)</h4>
                <p className="text-gray-700 mb-3">Quote di ricavi maturati ma non ancora incassati o di costi maturati ma non ancora sostenuti.</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-purple-100 rounded-xl p-5 bg-purple-50/50">
                        <h5 className="font-bold text-purple-900 mb-2">Ratei Attivi</h5>
                        <p className="text-sm text-purple-800 mb-3">Interessi di banca maturati e non ancora incassati:</p>
                        <code className="block bg-white p-2 text-xs rounded">Ratei attivi<br/>a Interessi attivi</code>
                        <div className="mt-3 text-xs text-purple-700">
                            <strong>Esempi:</strong>
                            <ul className="list-disc pl-4 mt-1">
                                <li>Quote di interessi attivi su depositi cauzionali</li>
                                <li>Quote di canoni di locazioni attive</li>
                                <li>Quote di interessi su prestiti a terzi</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border border-orange-100 rounded-xl p-5 bg-orange-50/50">
                        <h5 className="font-bold text-orange-900 mb-2">Ratei Passivi</h5>
                        <p className="text-sm text-orange-800 mb-3">Interessi passivi di competenza dell'esercizio pagati nell'esercizio successivo:</p>
                        <code className="block bg-white p-2 text-xs rounded">Interessi passivi<br/>a Ratei passivi</code>
                        <div className="mt-3 text-xs text-orange-700">
                            <strong>Esempi:</strong>
                            <ul className="list-disc pl-4 mt-1">
                                <li>Spese telefoniche, energia, acqua, gas</li>
                                <li>Quote ferie/permessi maturate non usufruite</li>
                                <li>Interessi passivi su mutui</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm">
                    <strong>N.B.:</strong> L'importo del rateo o risconto deve essere determinato mediante la ripartizione dei proventi o dell'onere, computando i giorni decorrenti dall'inizio degli effetti economici fino alla data di chiusura dell'esercizio.
                </div>
            </div>
        </section>

        {/* ACCANTONAMENTO TFR */}
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">Accantonamento al Fondo TFR</h3>
            <p className="mb-3 text-gray-700">Alla fine di ogni esercizio è necessario predisporre i conteggi per determinare l'adeguamento del fondo indennità di licenziamento dei dipendenti in forza al 31/12.</p>
            <code className="block bg-gray-50 p-3 text-sm rounded border mb-3">Indennità TFR<br/>a Fondo TFR</code>
            <ExpandableCard title="Imposta Sostitutiva su Rivalutazione TFR">
                <p>I sostituti di imposta devono versare l'acconto dell'imposta sostitutiva sulla rivalutazione annuale del TFR entro il 16/12 e il saldo di detta imposta a febbraio dell'anno successivo.</p>
                <code className="block bg-white p-2 text-xs rounded mt-2">Cred. Vs dip.ti x imposta sost.va su TFR<br/>a Erario c/ imposta sostitutiva</code>
            </ExpandableCard>
        </section>

        {/* PROVVIGIONI AGENTI */}
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">Provvigioni Agenti e Indennità</h3>
            <p className="mb-3 text-gray-700">La casa mandante deve correlare le provvigioni dovute ai ricavi che consegue dalla vendita dei propri prodotti.</p>
            
            <ExpandableCard title="Momento di Rilevazione Provvigione">
                <p className="mb-2">Il diritto alla provvigione può sorgere in tre diversi momenti:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Conclusione del contratto tra preponente e suo cliente</li>
                    <li>Esecuzione della prestazione (consegna merce o resa servizio)</li>
                    <li>Pagamento al preponente da parte del cliente</li>
                </ul>
                <p className="mt-3 text-sm bg-blue-50 p-2 rounded">La regola generale è individuare il diritto alla provvigione al momento della conclusione del contratto.</p>
            </ExpandableCard>

            <div className="mt-4">
                <h4 className="font-bold text-gray-800 mb-2">Indennità Suppletiva di Clientela</h4>
                <code className="block bg-gray-50 p-2 text-sm rounded mb-2">Accanton. Indennità suppletiva<br/>a Fondo indennità suppletiva</code>
                <p className="text-sm text-gray-600">L'accantonamento per indennità suppletiva di clientela è <strong>deducibile per competenza</strong> dal 1° gennaio 1993 (C.M. 33/E/2013).</p>
            </div>
        </section>

        {/* ONERI DIFFERITI DIPENDENTI */}
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">Oneri Differiti Dipendenti</h3>
            <p className="mb-3 text-gray-700">Costi del personale maturati alla data di chiusura dell'esercizio da contabilizzare per competenza: ratei di 14ᵃ mensilità, ferie, permessi e relativi costi contributivi.</p>
            <div className="space-y-2">
                <code className="block bg-gray-50 p-2 text-sm rounded">Retribuzione x rateo 14ᵃ/ferie/permessi<br/>a Debiti v/dipendenti</code>
                <code className="block bg-gray-50 p-2 text-sm rounded">Contributi previdenziali/INAIL<br/>a Debiti Previdenziali e assistenziali</code>
            </div>
        </section>

        {/* ACCANTONAMENTO TFM */}
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">Accantonamento TFM</h3>
            <p className="mb-3 text-gray-700">Le eventuali indennità da corrispondere agli amministratori di società alla cessazione della carica devono essere annualmente accantonate con criterio di competenza.</p>
            <code className="block bg-gray-50 p-2 text-sm rounded">Accanton. Indenn. amministratori<br/>a Fondo TFM</code>
            <div className="mt-3 bg-blue-50 border-l-4 border-blue-400 p-3 text-sm">
                La società deduce fiscalmente l'accantonamento annuale se il diritto all'indennità risulta da atto di data certa anteriore all'inizio del rapporto.
            </div>
        </section>

        {/* AMMORTAMENTI */}
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">Ammortamenti</h3>
            <p className="mb-3 text-gray-700">Il valore delle attrezzature, dei mobili, degli automezzi, delle macchine, subisce nel tempo un costante deprezzamento. Il costo dei beni deve essere ripartito in più esercizi.</p>
            <code className="block bg-gray-50 p-2 text-sm rounded mb-3">Ammortamento ordinario<br/>a F.do ammortamento</code>
            
            <ExpandableCard title="Credito d'Imposta Beni Strumentali 4.0" type="warning">
                <p className="mb-2">Per gli investimenti effettuati nel 2025 può essere previsto un credito d'imposta per gli investimenti in beni strumentali 4.0.</p>
                <p className="mb-2"><strong>Obblighi documentali:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Conservare documentazione idonea a dimostrare l'effettivo sostenimento della spesa</li>
                    <li>La fattura deve contenere l'espresso riferimento alle disposizioni (L. 178/2020 art. 1 commi da 1054 a 1058-ter)</li>
                    <li>Comunicazione preventiva e a consuntivo nei confronti del MIMIT</li>
                </ul>
            </ExpandableCard>
        </section>

        {/* ACCANTONAMENTO SVALUTAZIONE CREDITI */}
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">Accantonamento per Rischi su Crediti</h3>
            
            <div className="mb-4">
                <h4 className="font-bold text-gray-800 mb-2">Disciplina Civilistica (OIC 15)</h4>
                <p className="text-gray-700 mb-3">I crediti devono essere iscritti in bilancio al valore di presumibile realizzo.</p>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h5 className="font-bold text-blue-900 mb-2">Procedimento Analitico</h5>
                        <p className="text-sm text-blue-800">Scala dei rischi di insolvenza attraverso l'analisi dell'origine, entità, scadenza dei singoli crediti e solvibilità di ogni debitore.</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h5 className="font-bold text-green-900 mb-2">Procedimento Sintetico</h5>
                        <p className="text-sm text-green-800">Perdite stimate applicando misure a forfait (percentuale delle vendite o dei crediti a bilancio).</p>
                    </div>
                </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <h4 className="font-bold text-yellow-900 mb-2">Disciplina Fiscale</h4>
                <p className="text-sm text-yellow-800 mb-2">Deducibilità limitata del fondo svalutazione crediti allo <strong>0.50%</strong> del valore nominale dei crediti a fine esercizio.</p>
                <p className="text-sm text-yellow-800">La deduzione è consentita finché il totale dei fondi rischi raggiunge il <strong>5%</strong> del valore nominale dei crediti.</p>
            </div>

            <ExpandableCard title="Sottoconti Consigliati per Corretta Valutazione Fiscale">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Accantonamento e fondo svalutazione deducibile Art. 106 TUIR</li>
                    <li>Accantonamento e fondo svalutazione indeducibile</li>
                    <li>Accantonamento e fondo svalutazione MINICREDITI</li>
                    <li>Perdite su crediti eccedenti 0,5% e procedure concorsuali</li>
                </ul>
            </ExpandableCard>
        </section>

        {/* PERDITE SU CREDITI */}
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">Perdite su Crediti</h3>
            <p className="mb-3 text-gray-700">Le perdite su crediti sono deducibili fiscalmente solo se risultano da <strong>elementi certi e precisi</strong>.</p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3">
                <h4 className="font-bold text-blue-900 mb-2">Presunzioni di Legge (Dl 83/12)</h4>
                <p className="text-sm text-blue-800 mb-2">Gli elementi certi e precisi esistono per presunzione di legge quando:</p>
                <ul className="list-disc pl-5 text-sm text-blue-800 space-y-1">
                    <li>Il credito è di modesta entità ed è scaduto da sei mesi</li>
                    <li>Il diritto alla riscossione è prescritto</li>
                    <li>Cancellazione dei crediti dal bilancio a seguito di eventi estintivi</li>
                </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div className="bg-gray-50 p-4 rounded-lg border">
                    <h5 className="font-bold text-gray-800 mb-1">Grandi Imprese</h5>
                    <p className="text-sm text-gray-600">(fatturato &gt; 150 milioni)</p>
                    <p className="text-lg font-bold text-bdz-red mt-2">€ 5.000</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border">
                    <h5 className="font-bold text-gray-800 mb-1">Altre Imprese</h5>
                    <p className="text-sm text-gray-600">(fatturato ≤ 150 milioni)</p>
                    <p className="text-lg font-bold text-bdz-red mt-2">€ 2.500</p>
                </div>
            </div>

            <code className="block bg-gray-50 p-2 text-sm rounded">Fondo svalutazione crediti / Perdite su crediti<br/>a Crediti clienti</code>
        </section>
      </div>
    )
  },
  {
    id: "section-c",
    title: "C. Inventario Magazzino",
    content: (
      <div className="space-y-6">
        <p className="text-gray-700">Le rimanenze al 31/12 devono essere valorizzate al <strong>costo di acquisto</strong> o al <strong>valore di realizzo</strong> (se minore).</p>
        
        {/* SUDDIVISIONE */}
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">SUDDIVISIONE</h3>
            <p className="mb-3 text-gray-700">I beni che costituiscono giacenze di magazzino devono essere raggruppati in categorie omogenee:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Materie Prime', 'Sussidiarie', 'Consumo', 'Merci', 'Semilavorati', 'Prodotti Finiti'].map((item) => (
                    <div key={item} className="bg-white p-3 rounded border text-center font-medium shadow-sm hover:shadow-md hover:border-bdz-red hover:text-bdz-red transition-all cursor-default">
                        {item}
                    </div>
                ))}
            </div>

            <ExpandableCard title="Criteri di Omogeneità" type="info">
                <p className="mb-2">Le categorie omogenee devono rispettare due criteri:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Per natura:</strong> i beni devono appartenere allo stesso genere in relazione alle loro proprietà e caratteristiche merceologiche</li>
                    <li><strong>Per valore:</strong> i beni devono avere identico contenuto economico</li>
                </ul>
            </ExpandableCard>
        </section>

        {/* COSA INCLUDE */}
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">Cosa Concorre alle Rimanenze</h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-900 mb-2">✓ DA INCLUDERE</h4>
                    <ul className="list-disc pl-5 text-sm text-green-800 space-y-1">
                        <li>Beni fisicamente presenti nei magazzini</li>
                        <li>Merci in viaggio (acquistate non ancora ricevute)</li>
                        <li>Beni presso terzi (c/deposito, lavorazione, visione)</li>
                        <li>Merci ricevute senza fattura (fatture da ricevere)</li>
                    </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-bold text-red-900 mb-2">✗ DA ESCLUDERE</h4>
                    <ul className="list-disc pl-5 text-sm text-red-800 space-y-1">
                        <li>Beni di proprietà di terzi</li>
                        <li>Merci ricevute in deposito</li>
                        <li>Merci ricevute in lavorazione</li>
                        <li>Merci ricevute in visione</li>
                    </ul>
                </div>
            </div>
        </section>

        {/* VALORIZZAZIONE */}
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">VALORIZZAZIONE</h3>
            <p className="mb-3 text-gray-700">Ai sensi dell'articolo 2426, punto 9, del Codice Civile, le rimanenze devono essere valutate in base al costo di acquisto o di produzione, ovvero in base al valore di realizzazione desumibile dall'andamento del mercato, se minore.</p>

            <ExpandableCard title="Costo di Produzione per Beni Prodotti Internamente" type="warning">
                <p className="mb-3">Per i beni prodotti internamente, il costo di produzione deve comprendere tutti i costi direttamente imputabili al bene e, secondo la quota ragionevolmente attribuibile al prodotto, tutti i costi a esso indirettamente imputabili.</p>
                <p className="mb-2"><strong>L'azienda deve dotarsi di un adeguato sistema di contabilità analitica:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Direct costing:</strong> utilizzando i costi diretti</li>
                    <li><strong>Full costing:</strong> includendo oltre ai costi diretti anche una quota di spese generali di produzione</li>
                </ul>
            </ExpandableCard>

            <div className="mt-4">
                <h4 className="font-bold text-gray-800 mb-2">Criteri di Valutazione Fiscali</h4>
                <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded border">
                        <h5 className="font-semibold text-gray-800 mb-1">LIFO</h5>
                        <p className="text-xs text-gray-600">Ultimo entrato = primo uscito</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded border">
                        <h5 className="font-semibold text-gray-800 mb-1">FIFO</h5>
                        <p className="text-xs text-gray-600">Primo entrato = primo uscito</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded border">
                        <h5 className="font-semibold text-gray-800 mb-1">Media Ponderata</h5>
                        <p className="text-xs text-gray-600">Costo medio di periodo</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded border">
                        <h5 className="font-semibold text-gray-800 mb-1">Costi Specifici</h5>
                        <p className="text-xs text-gray-600">Costo specifico per ogni bene</p>
                    </div>
                </div>

                <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm">
                    <strong>Importante:</strong> Una volta adottato un criterio di valutazione questo non potrà essere mutato negli esercizi successivi se non in casi eccezionali che andranno adeguatamente motivati.
                </div>
            </div>
        </section>

        {/* ACCORGIMENTI */}
        <section>
            <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">ACCORGIMENTI</h3>
            <p className="mb-3 text-gray-700">Alla base di una corretta valutazione delle rimanenze vi è un'accurata conta fisica:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Tenere nei limiti del possibile la produzione ferma</li>
                <li>Predisporre un programma di inventario fisico ben dettagliato da spiegare agli addetti</li>
                <li>Effettuare le conte con adeguata documentazione</li>
            </ul>
        </section>

        {/* OBBLIGHI FISCALI */}
        <div className="bg-red-50 p-5 rounded-lg border border-red-100">
            <h4 className="text-bdz-red font-bold flex items-center gap-2 mb-3">
                <FileText size={20}/> Obblighi Fiscali
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Nell'inventario deve essere riportata la consistenza analitica per categorie omogenee. L'assenza della distinta analitica permette all'Amministrazione Finanziaria di procedere ad accertamento induttivo.
            </p>
            <p className="text-sm text-gray-700 mb-3">
                È possibile non trascrivere nel Libro inventari l'elenco analitico delle rimanenze ma solo indicarne il valore complessivo alla condizione di tenere a disposizione le distinte analitiche datate e sottoscritte.
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
              {/* NOVITÀ D.LGS 139/2015 */}
              <section>
                  <h3 className="text-xl font-serif text-bdz-red mb-3 font-bold">Novità D.lgs 139/2015</h3>
                  <p className="mb-3 text-gray-700">Dal 1° gennaio 2016 sono entrate in vigore alcune novità di rilievo:</p>
                  <div className="space-y-3">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-bold text-blue-900 mb-2">✓ Costi di Ricerca e Pubblicità</h4>
                          <p className="text-sm text-blue-800">Non vanno più indicati tra le immobilizzazioni. Sono capitalizzabili solo i "costi di sviluppo" (B.I.2)</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-bold text-blue-900 mb-2">✓ Conti d'Ordine</h4>
                          <p className="text-sm text-blue-800">Non vanno più riportati in calce allo stato patrimoniale. Le informazioni sono da riportare in Nota integrativa.</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-bold text-blue-900 mb-2">✓ Area Straordinaria</h4>
                          <p className="text-sm text-blue-800">Eliminata la macroclasse E). Le sopravvenienze vanno contabilizzate per natura: "relative a tasse", "gestione operativa", "gestione finanziaria".</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-bold text-blue-900 mb-2">✓ Avviamento</h4>
                          <p className="text-sm text-blue-800">Va ammortizzato secondo la sua vita utile e, se in casi eccezionali non è possibile stimarla, entro un periodo non superiore a dieci anni.</p>
                      </div>
                  </div>
              </section>

              {/* IMMOBILIZZAZIONI */}
              <section>
                  <h3 className="text-xl font-serif text-bdz-red mb-2 font-bold">Immobilizzazioni</h3>
                  <p className="text-gray-700 mb-2">Sono capitalizzabili solo i costi sostenuti per l'acquisto o la costruzione di nuovi cespiti, o per l'incremento significativo della capacità/vita utile di quelli esistenti.</p>
                  
                  <ExpandableCard title="Ammortamento e Manutenzione">
                    <p className="mb-2">Le spese di manutenzione ordinaria sono deducibili nel limite del 5% del costo complessivo di tutti i beni materiali ammortizzabili.</p>
                    <p>L'eccedenza è deducibile in quote costanti nei 5 esercizi successivi.</p>
                  </ExpandableCard>

                  <div className="mt-4">
                      <h4 className="font-bold text-gray-800 mb-2">Costi Capitalizzabili</h4>
                      <p className="text-sm text-gray-700 mb-3">Nel costo di acquisto si computano anche i costi accessori. Il costo di produzione comprende tutti i costi direttamente imputabili all'immobilizzazione materiale e può comprendere anche altri costi per la quota ragionevolmente imputabile.</p>
                      
                      <div className="overflow-x-auto border rounded-lg">
                          <table className="min-w-full text-sm">
                              <thead className="bg-gray-50">
                                  <tr>
                                      <th className="p-3 text-left font-bold">Tipo Cespite</th>
                                      <th className="p-3 text-left font-bold">Costi Accessori - Esempi</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y">
                                  <tr>
                                      <td className="p-3 font-medium">Fabbricati</td>
                                      <td className="p-3">
                                          <ul className="list-disc pl-4 text-xs space-y-1">
                                              <li>Spese notarili per redazione atto di acquisto</li>
                                              <li>Tasse per registrazione dell'atto</li>
                                              <li>Onorari per progettazione dell'immobile</li>
                                              <li>Costi per opere di urbanizzazione primaria e secondaria</li>
                                          </ul>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td className="p-3 font-medium">Impianti e Macchinario</td>
                                      <td className="p-3">
                                          <ul className="list-disc pl-4 text-xs space-y-1">
                                              <li>Spese di progettazione, trasporti</li>
                                              <li>Dazi su importazione</li>
                                              <li>Spese di installazione</li>
                                              <li>Costi e onorari di perizie e collaudi</li>
                                          </ul>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td className="p-3 font-medium">Mobili</td>
                                      <td className="p-3">
                                          <ul className="list-disc pl-4 text-xs space-y-1">
                                              <li>Trasporto</li>
                                              <li>Dazi su importazione</li>
                                          </ul>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </section>

              {/* CREDITI E PERDITE */}
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
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    if (window.innerWidth < 1024) close();
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={close}
        />
      )}
      
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
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-full-width { width: 100% !important; max-width: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-none { border: none !important; }
          .print\\:break-inside-avoid { break-inside: avoid !important; }
        }
        .bdz-red { color: #991b1b; }
        .bg-bdz-red { background-color: #991b1b; }
        .text-bdz-red { color: #991b1b; }
        .border-bdz-red { border-color: #991b1b; }
        .bdz-dark { color: #1f2937; }
      `}</style>

      <Header toggleSidebar={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 container mx-auto max-w-7xl">
        <Sidebar 
          isOpen={isSidebarOpen} 
          close={() => setIsSidebarOpen(false)} 
          activeSection={activeSection}
        />

        <main className="flex-1 w-full lg:px-8 py-8 print-full-width">
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

        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;