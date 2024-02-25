import * as React from "react";
import { useState, useEffect } from "react";
import { HeadFC, PageProps, withPrefix } from "gatsby";
import "./index.scss";
import images from "../images";
import { OutboundLink } from "gatsby-plugin-google-gtag";

const year = new Date().getFullYear();

const IndexPage: React.FC<PageProps> = () => {
  const [showConsentBanner, setShowConsentBanner] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true,
    analytics: false, // Default to false until the user accepts
  });
  const [showSettingsModal, setShowSettingsModal] = useState(false);

    // SettingsModal component
  const SettingsModal = ({ onClose, onSave, consent, setConsent }) => {
    // Function to handle consent change
    const handleConsentChange = (e) => {
      setConsent({ ...consent, [e.target.name]: e.target.checked });
    };

    // Save and close the modal
    const handleSave = () => {
      localStorage.setItem('consent', JSON.stringify(consent));
      onSave();
    };

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Ensure it's above everything else
      }}>
          <div style={{
            padding: 50
          }}>
          <h2>Nastavenia cookies</h2>
          {/* Your settings form elements go here */}
          <label>
            <input
              type="checkbox"
              name="necessary"
              checked={true}
              onChange={() => {}}
            />
            Nevyhnutne nutné súbory cookie
          </label>
          <p>Sú to základné súbory cookie, ktoré umožňujú pohybovať sa po webovej stránke a používať jej funkcie. Tieto súbory cookie neukladajú žiadne informácie o vás, ktoré by sa dali použiť na marketing alebo na zapamätaniesi, čo ste si na internete pozerali.</p>
          <label>
            <input
              type="checkbox"
              name="analytics"
              checked={consent.analytics}
              onChange={handleConsentChange}
            />
            Analytické súbory cookie
          </label>
          <p>Tieto súbory zbierajú informácie o tom, ako sa používala webová stránka, napríklad ktoré stránky najčastejšie navštevujete a či sa vám zobrazili chybové hlásenia. Nezbierajú informácie, na základe ktorých by bolo možné zistiť vašu totožnosť. Všetky informácie sú anonymné. Používajú sa na zlepšenie funkčnosti webových stránok.</p>
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <button onClick={handleSave} style={{ marginRight: '10px' }}>Uložiť nastavenia</button>
            <button onClick={onClose}>Zatvoriť </button>
          </div>
          </div>
          
      </div>
    );
  };

  // Then inside your IndexPage component
  // ...

  const handleSaveSettings = () => {
    setShowSettingsModal(false);
    setShowConsentBanner(false);
  };

  useEffect(() => {
    const storedPreferences = localStorage.getItem("consent");
    if (!storedPreferences) {
      setShowConsentBanner(true);
    } else {
      setConsent(JSON.parse(storedPreferences));
    }
  }, []);

  const handleAcceptAnalytics = () => {
    setConsent({ ...consent, analytics: true });
    localStorage.setItem('userConsent', JSON.stringify({ ...consent, analytics: true }));
    setShowConsentBanner(false);
    // Hide the popup
  };

  const handleRejectAnalytics = () => {
    setConsent({ ...consent, analytics: false });
    localStorage.setItem('userConsent', JSON.stringify({ ...consent, analytics: false }));
    setShowConsentBanner(false);
    // Hide the popup
  };


  const handleOpenSettings = () => {
    // Logic to open modal or show settings section
    // For simplicity, we'll just toggle analytics consent in this example
    const updatedPreferences = { ...consent, analytics: !consent.analytics };
    setConsent(updatedPreferences);
    localStorage.setItem("consent", JSON.stringify(updatedPreferences));
    setShowSettingsModal(true);
  };



  return (
    <>
      {showSettingsModal && (
    <SettingsModal
      onClose={() => setShowSettingsModal(false)}
      onSave={handleSaveSettings}
      consent={consent}
      setConsent={setConsent}
    />
  )}
      {showConsentBanner && (
        <div style={{ backgroundColor: 'white', padding: '10px' }}>
          <p style={{fontWeight: 'bold'}}>Súbory cookies na stránke www.info-mat.sk</p>
          <p>Aby táto služba fungovala, používame niektoré nevyhnutné súbory cookies.</p>
          <p>Chceli by sme nastaviť ďalšie súbory cookies, aby sme si mohli zapamätať vaše nastavenia, porozumieť tomu, ako ľudia používajú službu, a vykonať vylepšenia.</p>
          <button onClick={handleAcceptAnalytics} style={{ backgroundColor: '#5358c7', marginRight: '5px',  marginLeft: '5px', marginBottom: '5px', color: 'white', cursor: 'pointer'}}>
            Prijať všetky cookies
          </button>
          <button onClick={handleRejectAnalytics} style={{ backgroundColor: '#5358c7', margin: '0 5px', marginTop: '5px' ,marginBottom: '5px', color: 'white', cursor: 'pointer'}}>
            Iba nevyhnutné
          </button>
          <button onClick={handleOpenSettings} style={{ backgroundColor: '#5358c7', marginLeft: '5px', marginBottom: '5px', color: 'white', cursor: 'pointer' }}>
            Nastavenia
          </button>
        </div>
      )}
      <main>
        <header>
          <nav><img src={images.logo} alt="Infomat logo" /></nav>
          <div>
            <div className="text">
              <h1>Infomat</h1>
              <p>Rozvíjame kritické myslenie a&nbsp;mediálnu gramotnosť v&nbsp;stredoškolskom prostredí.</p>
              <a data-type="button" href="https://www.app.info-mat.sk/">Prejsť do&nbsp;aplikácie</a>
            </div>
            <div className="image">
              <img src={images.sample} alt="App sample" />
            </div>
            <div className="circle" style={{ left: "-75rem", top: "-10rem", }}></div>
            <div className="circle" data-hideOnMobile style={{ right: "-40rem", top: "-65rem", }}></div>
          </div>
        </header>
        <section className="columns">
          <h2>Infomat pomáha pri rozvoji mäkkých zručností</h2>
          <div>
            <div>
              <img src={images.problemSolving} alt="" />
              <h3>Problem-solving</h3>
              <p>V&nbsp;rámci Infomatu majú žiaci možnosť prechádzať týždennými výzvami, kde musia kriticky myslieť a&nbsp;hľadať efektívne riešenia. Pravidelným precvičovaním kritického myslenia môžu žiaci zlepšiť svoje schopnosti riešiť problémy, čo im <strong>umožní pristupovať k&nbsp;zložitým problémom sebavedome.</strong></p>
            </div>
            <div>
              <img src={images.communication} alt="" />
              <h3>Komunikačné zručnosti</h3>
              <p>Kritické myslenie zahŕňa efektívne formulovanie myšlienok, nápadov a&nbsp;argumentov. Okrem týždenných výziev majú žiaci možnosť zapojiť sa do&nbsp;triedneho diskusného fóra, kde si môžu natrénovať argumentácie. Táto aktivita môže zlepšiť ich komunikačné schopnosti, vrátane schopnosti <strong>jasne vyjadrovať myšlienky, aktívne počúvať a&nbsp;vytvárať presvedčivé argumenty.</strong></p>
            </div>
            <div>
              <img src={images.decisionMaking} alt="" />
              <h3>Decision-making</h3>
              <p>Robiť informované rozhodnutia je dôležitým aspektom kritického myslenia. Vďaka aplikácii Infomat si žiaci môžu precvičiť vyhodnocovanie rôznych možností, zvažovanie potenciálnych dôsledkov a&nbsp;rozhodovanie sa pre&nbsp;správne možnosti na&nbsp;základe <strong>logických úvah a&nbsp;dôkazov.</strong></p>
            </div>
          </div>
        </section>
        <section className="rows">
          <div>
            <h2>Ako appka funguje?</h2>
            <div>
              <div>
                <img src={images.forum} alt="Diskusné fórum" />
                <img className="icon" src={images.forumIcon} alt="Diskusné fórum" />
                <div>
                  <h3>Diskusné fórum</h3>
                  <p>Učitelia majú možnosť v&nbsp;rámci triedy založiť diskusiu na&nbsp;aktuálne dianie, kde sa žiaci môžu vyjadriť a&nbsp;precvičiť si tak svoje argumentačné schopnosti.</p>
                </div>
              </div>
              <div>
                <img src={images.challenges} alt="Týždenné výzvy" />
                <img className="icon" src={images.challengesIcon} alt="Týždenné výzvy" />
                <div>
                  <h3>Týždenné výzvy</h3>
                  <p>Pre&nbsp;žiakov sme pripravili testy, ktoré preskúšajú ich kritické myslenie na&nbsp;praktických príkladoch.</p>
                </div>
              </div>
              <div>
                <img src={images.education} alt="Vzdelávanie" />
                <img className="icon" src={images.educationIcon} alt="Vzdelávanie" />
                <div>
                  <h3>Vzdelávanie</h3>
                  <p>Učitelia aj žiaci tu môžu nájsť tipy na&nbsp;vzdelávacie podujatia, projekty a&nbsp;materiály, ktoré ich môžu posunúť ďalej.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="image">
            <img src={images.howItWorks} alt="Ako appka funguje?" />
          </div>
          <div className="circle" data-hideOnDesktop style={{ right: "-75rem", top: "-5rem", }}></div>
          <div className="circle" data-hideOnMobile style={{ right: "-30rem", top: "-15rem", }}></div>
        </section>
        <section className="text">
          <h2>Ako sa zapojiť?</h2>
          <p>Obsah týždenných výziev a&nbsp;diskusií je navrhnutý tak, aby sa dal jednoducho implementovať do&nbsp;osnov predmetov ako sú Slovenský jazyk, Dejepis, Etika alebo Občianska náuka. Počas tvorby otázok sme dbali na&nbsp;to, aby sme sa držali v&nbsp;medziach štátneho vzdelávacieho programu. Ak si ako stredná škola prajete Infomat implementovať do&nbsp;výučbového procesu, kontaktujte nás.</p>
          <a data-type="button" className="secondary" href="mailto:support@info-mat.sk">Kontaktujte nás</a>
        </section>
        <section className="quote">
          <img className="hideOnMobile" src={images.pishkotky} alt="Tím Pishkotky" />
          <div>
            <h2>Prečo sa zapojiť?</h2>
            <img src={images.pishkotky} alt="Tím Pishkotky" />
            <div>
              <p>„Z&nbsp;dlhodobého hľadiska patrí Slovensko pod&nbsp;priemer v&nbsp;krajinách OECD v&nbsp;prieskumoch PISA. Aj z&nbsp;tohto dôvodu sme vyvinuli Infomat - aplikáciu, ktorá interaktívnou a&nbsp;zábavnou formou sprevádza stredoškolských študentov pri&nbsp;rozvoji kritického myslenia a&nbsp;mediálnej gramotnosti. Výučba kritického myslenia sa teda vďaka našej aplikácii nemusí vykonávať prostredníctvom nových učebníc, ale jednoducho cez týždenné výzvy zamerané na&nbsp;jednotlivé aspekty mediálnej gramotnosti, ktoré boli pripravené v&nbsp;spolupráci so Slovenskou debatnou asociáciou.“</p>
              <p className="name">- Marianna Szarková</p>
            </div>
            
          </div>
        </section>
        <section className="hacknime-to">
            <img className="hideOnMobile" src={images.hacknimeTo} alt="Hacknime-to" />
            <p><a href="https://www.hacknime.to/">Viac informácií o projekte Hackathony a pripravovaných hackathonoch nájdete TU.</a></p>
        </section>
        <footer>
          <div className="logo">
            <img src={images.logo} alt="Infomat logo" />
            <p>&copy; {year}</p>
          </div>
          <ul>
            <p>Linky</p>
            <li><a href={withPrefix("/Podmienky_ochrany_osobných_údajov_aplikácia_Infomat_final.pdf")} download="Podmienky_ochrany_osobných_údajov_aplikácia_Infomat_final.pdf">Ochrana osobných údajov</a></li>
            <li><a href={withPrefix("/Podmienky_používania_aplikácie_infomat.pdf")} download="Podmienky_používania_aplikácie_infomat.pdf">Podmienky používania aplikácie</a></li>
            <li><a href={withPrefix("/Informačná_povinnosť_aplikácia_Infomat_final.pdf")} download="Informačná_povinnosť_aplikácia_Infomat_final.pdf">Informačná povinnosť</a></li>
            <li><a href="mailto:support@info-mat.sk">Kontakt</a></li>
          </ul>
          <div>
            <p>S podporou</p>
            <div className="images">
              <OutboundLink href="https://www.mirri.gov.sk/" target="_blank"><img src={images.logoMirri} alt="Logo MIRRI" /></OutboundLink>
              <OutboundLink href="https://www.planobnovy.sk/" target="_blank"><img src={images.logoPOO} alt="Logo Plán obnovy" /></OutboundLink>
              <OutboundLink href="https://next-generation-eu.europa.eu/index_sk" target="_blank"><img src={images.europeanUnion} alt="Logo EU" /></OutboundLink>
              <OutboundLink href="https://www.sda.sk/" target="_blank"><img src={images.logoSDA} alt="Logo SDA" /></OutboundLink>
            </div>
          </div>
        </footer> 
      </main>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <>
  <title>Infomat</title>
  <link rel="icon" href={images.favicon} />
  <meta name="description" content="Infomat je aplikácia, ktorá interaktívnou a zábavnou formou sprevádza stredoškolských študentov pri rozvoji kritického myslenia a mediálnej gramotnosti." />
</>


