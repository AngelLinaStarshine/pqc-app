/* eslint-env es2020 */
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  Globe2,
  ShieldCheck,
  Cpu,
  Brain,
  Zap,
  BookOpen,
  Languages,
  Info,
} from "lucide-react";

import { DarkToggle, Chip, i18n } from "./shared"; // ensure shared.js exports i18n, DarkToggle, Chip
import Learn from "./pages/learn";
import Simulate from "./pages/simulate";
import Access from "./pages/access";
import Project from "./pages/project";
import Resources from "./pages/resources";

/* -------- Role Gate -------- */
/* -------- Role Gate (NO PASSWORD) -------- */
function RoleGate({ onPass }) {
  const [role, setRole] = useState("student");

  const handleEnter = () => {
    localStorage.setItem("pqc_role", role);
    localStorage.setItem("pqc_authed", "1");
    onPass(role);
  };

  return (
    <div className="mx-auto mt-16 max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
        Welcome
      </h2>

      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Choose your role to enter the PQC learning platform.
      </p>

      {/* Role Selector */}
      <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">
        Role
      </label>

      <select
        className="mt-1 w-full rounded-lg border border-slate-200 p-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>

      <button
        onClick={handleEnter}
        className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 transition"
      >
        Enter
      </button>

      <p className="mt-4 text-xs text-slate-500">
        No password required.
      </p>
    </div>
  );
}


/* -------- App -------- */
export default function App() {
  /* Language (persist) */
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  useEffect(() => localStorage.setItem("lang", lang), [lang]);

  /* Strings */
  const t = useMemo(() => i18n[lang] ?? i18n.en, [lang]);

  /* Auth/role */
  const [authedRole, setAuthedRole] = useState(() => {
    return localStorage.getItem("pqc_authed") === "1"
      ? localStorage.getItem("pqc_role") || "student"
      : null;
  });

  /* Tabs */
  const [tab, setTab] = useState("learn");
  const tabs = useMemo(
    () => [
      { id: "learn", label: t.learn, icon: BookOpen },
      { id: "simulate", label: t.simulate, icon: Cpu },
      { id: "access", label: t.assess, icon: Brain }, // Assess content
      { id: "project", label: t.project, icon: Zap },
      { id: "resources", label: t.resources, icon: Info },
    ],
    [t]
  );

  const logout = () => {
    localStorage.removeItem("pqc_authed");
    localStorage.removeItem("pqc_role");
    setAuthedRole(null);
  };

  /* Gate */
  if (!authedRole) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
              <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                {t.appTitle}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <label className="ml-2 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                <Languages className="h-4 w-4" />
                {t.language}
                <select
                  aria-label="Language selector"
                  className="rounded-lg border border-slate-200 p-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </label>
              <DarkToggle />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">
          <RoleGate onPass={setAuthedRole} />
        </main>
      </div>
    );
  }

  /* Authed UI */
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {t.appTitle}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Chip icon={Globe2}>{t.standards || "Standards"}</Chip>

            {/* Role badge */}
            <span
              className={`rounded-full border px-2 py-1 text-xs font-medium transition
                ${
                  authedRole === "teacher"
                    ? "border-yellow-400 text-yellow-700 bg-yellow-50 dark:border-yellow-500/60 dark:text-yellow-300 dark:bg-yellow-900/30"
                    : "border-teal-400 text-teal-700 bg-teal-50 dark:border-teal-500/60 dark:text-teal-300 dark:bg-teal-900/30"
                }`}
            >
              Role: {authedRole}
            </span>

            {/* Language */}
            <label className="ml-2 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <Languages className="h-4 w-4" />
              {t.language}
              <select
                aria-label="Language selector"
                className="rounded-lg border border-slate-200 p-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </label>

            <DarkToggle />

            {/* Logout */}
            <button
              onClick={logout}
              className="rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 text-sm text-slate-700 shadow-sm
                         hover:bg-white/80 active:scale-[.98] transition
                         dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-200
                         dark:hover:bg-blue-700 dark:hover:text-white"
              title="Log out"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Hero */}
        <section
          aria-label="Intro"
          className="mb-6 rounded-2xl bg-gradient-to-r from-blue-50 to-teal-50 p-6 ring-1 ring-inset ring-slate-200 dark:from-slate-800/60 dark:to-slate-800/30 dark:ring-slate-700"
        >
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-slate-700 dark:text-slate-200">
              {t.heroBlurb}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setTab("simulate")}
                className="rounded-xl bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 active:scale-[.98] transition"
              >
                {t.start}
              </button>
              <button
                onClick={() => setTab("learn")}
                className="rounded-xl border border-blue-200 bg-white px-4 py-2 text-blue-700 shadow-sm hover:bg-blue-50 active:scale-[.98] transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {t.learn}
              </button>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <nav aria-label="Main navigation" className="mb-6 flex flex-wrap gap-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-sm ring-1 ring-inset transition ${
                tab === id
                  ? "bg-blue-600 text-white ring-blue-600"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800"
              }`}
              aria-current={tab === id ? "page" : undefined}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        {/* Routed content */}
        {tab === "learn" && <Learn t={t} lang={lang} role={authedRole} />}
        {tab === "simulate" && <Simulate t={t} lang={lang} role={authedRole} />}
        {tab === "access" && <Access t={t} lang={lang} role={authedRole} />} {/* Assess */}
        {tab === "project" && <Project t={t} lang={lang} role={authedRole} />}
        {tab === "resources" && <Resources t={t} lang={lang} role={authedRole} />}
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            Educational demo. Do not use for real cryptographic security. ©Besoangel{" "}
            {new Date().getFullYear()} PQC in HS Curriculum.
          </p>
        </div>
      </footer>
    </div>
  );
}
