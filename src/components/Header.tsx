/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Terminal, Award, BookOpen, Flame, Moon, Sun, Menu, X, User } from "lucide-react";
import { UserProfile } from "../types";

interface HeaderProps {
  user: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onLogout: () => void;
  onLoginSim: () => void;
}

export default function Header({
  user,
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  onLogout,
  onLoginSim
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tabs definitions in Uzbek language
  const tabs = [
    { id: "courses", label: "Kurslar", icon: Terminal },
    { id: "practice", label: "Amaliyot (Code)", icon: Terminal },
    { id: "interview", label: "Suhbat Savollari", icon: Award },
    { id: "projects", label: "Loyihalar", icon: Award },
    { id: "dashboard", label: "Kabinetingiz", icon: User }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0A0A0A]/95 text-slate-300 backdrop-blur-md transition-colors duration-300 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer"
            onClick={() => setActiveTab("interview")}
            id="app_logo"
          >
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-mono font-bold w-8 h-8 rounded-lg text-sm flex items-center justify-center shadow-lg shadow-blue-500/15 border border-blue-400/30">
              Py
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-white">
              PySchool
            </span>
            <span className="hidden sm:inline bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Beta
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1" id="desktop_nav">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav_tab_${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-blue-600/10 text-blue-400 font-semibold border border-blue-500/20"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right section - Widgets */}
          <div className="flex items-center space-x-3">
            {/* Gamification Indicator */}
            <div className="flex items-center space-x-3 mr-1 sm:mr-3">
              {/* XP */}
              <div 
                className="flex items-center space-x-1 bg-blue-950/20 text-blue-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-blue-900/30"
                title="Sizning joriy Tajribangiz (XP)"
              >
                <Award className="w-3.5 h-3.5 mr-0.5 text-blue-500" />
                <span>{user.xp} XP</span>
              </div>

              {/* Streak */}
              <div 
                className="flex items-center space-x-1 bg-orange-950/20 text-orange-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-orange-900/30"
                title="Kunlik dars seriyasi (Streak)"
              >
                <Flame className="w-3.5 h-3.5 animate-pulse text-orange-500" />
                <span>{user.streak} kun</span>
              </div>
            </div>



            {/* Profile display */}
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <div className="bg-slate-800 w-6 h-6 rounded-md text-[10px] font-mono font-bold text-white flex items-center justify-center uppercase">
                  {user.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-xs font-medium text-slate-300">{user.name}</span>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800/85 focus:outline-none"
              id="mobile_menu_toggle_btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A0A0A] border-b border-slate-800 transition-all duration-200 animate-fadeIn" id="mobile_menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600/10 text-blue-400 font-semibold"
                      : "text-slate-450 hover:bg-slate-800 dark:hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0 text-slate-450" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
            
            {/* Mobile Profile info */}
            <div className="pt-4 pb-2 border-t border-slate-800 px-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-slate-800 px-2 py-1 rounded text-xs font-bold font-mono text-white border border-slate-700">
                  {user.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
