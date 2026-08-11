'use client'

import { useState } from "react";
import { useCalc } from "./hooks/useCalc.js";
import { Navbar } from "./components/Navbar.jsx";
import { HamburgerMenu } from "./components/HamburgerMenu.jsx";
import { SettingsModal } from "./components/SettingsModal.jsx";
import { PropertyTab } from "./tabs/PropertyTab.jsx";
import { DevelopmentTab } from "./tabs/DevelopmentTab.jsx";
import { SummaryTab } from "./tabs/SummaryTab.jsx";
import { OwnershipOpTab } from "./tabs/OwnershipOpTab.jsx";
import { PrefabVsStickTab } from "./tabs/PrefabVsStickTab.jsx";
import { defaultInputs, defaultOpp, DARK, LIGHT } from "./utils.js";
import "./calculator.css";

export function CalculatorApp() {
  const [inputs, setInputs] = useState(defaultInputs);
  const [opp, setOpp] = useState(defaultOpp);
  const [activeTab, setActiveTab] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const set = key => val => setInputs(prev => ({ ...prev, [key]: val }));
  const setO = key => val => setOpp(prev => ({ ...prev, [key]: val }));
  const calc = useCalc(inputs);
  const toggleDark = () => setDarkMode(v => !v);

  const T = darkMode ? DARK : LIGHT;

  const tabProps = { inputs, set, opp, setO, calc, T };

  return (
    <div
      className="pd28-calculator"
      data-theme={darkMode ? "dark" : "light"}
      style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'Geist', 'Inter', sans-serif", transition: "background 0.2s, color 0.2s" }}
    >

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        toggleDark={toggleDark}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <HamburgerMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        inputs={inputs}
        set={set}
      />

      <div className="page-shell" style={{ paddingTop: "56px" }}>
        {activeTab === 0 && <PropertyTab {...tabProps} />}
        {activeTab === 1 && <DevelopmentTab {...tabProps} />}
        {activeTab === 2 && <SummaryTab inputs={inputs} calc={calc} T={T} onOpenSettings={() => setSettingsOpen(true)} />}
        {activeTab === 3 && <OwnershipOpTab {...tabProps} />}
        {activeTab === 4 && <PrefabVsStickTab inputs={inputs} T={T} />}
      </div>
    </div>
  );
}
