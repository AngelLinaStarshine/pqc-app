/* eslint-env es2020 */
import React, { useMemo, useState } from "react";
import "./App.css";
import {
  Globe2,
  ShieldCheck,
  Languages,
  BookOpen,
  Route,
  Info,
} from "lucide-react";

import { DarkToggle, Chip, i18n } from "./shared";
import Learn from "./pages/learn";
import LearningPath from "./pages/learning-path";
import Resources from "./pages/resources";

function RoleGate({ onPass }) {
  const [role, setRole] = useState("student");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleEnter = () => {
    const ok =
      (role === "student" && code === "student25") ||
      (role === "teacher" && code === "teacher25");
    if (ok) {
      localStorage.setItem("pqc_role", role);
      localStorage.setItem("pqc_authed", "1");
      onPass(role);
    } else {
      setError("Invalid code for selected role.");
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
        Welcome
      </h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Choose your role and enter your personal code to proceed.
      </p>

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

      <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">
        Personal code
      </label>
      <input
        type="password"
        className="mt-1 w-full rounded-lg border border-slate-200 p-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={role === "student" ? "student25" : "teacher25"}
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <button
        onClick={handleEnter}
        className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
        type="button"
      >
        Enter
      </button>

      <p className="mt-4 text-xs text-slate-500">
        Student code: <code>student25</code> · Teacher code: <code>teacher25</code>
      </p>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const t = i18n[lang] ?? i18n.en;

  const [authedRole, setAuthedRole] = useState(() => {
    return localStorage.getItem("pqc_authed") === "1"
      ? localStorage.getItem("pqc_role") || "student"
      : null;
  });

  const [tab, setTab] = useState("learn");

  const tabs = useMemo(
    () => [
      { id: "learn", label: t.learn, icon: BookOpen },
      { id: "path", label: t.learningPath, icon: Route },
      { id: "resources", label: t.resources, icon: Info },
    ],
    [t]
  );

  const logout = () => {
    localStorage.removeItem("pqc_authed");
    localStorage.removeItem("pqc_role");
    setAuthedRole(null);
  };

  // Animated background
  const Bg = () => (
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#ff9dce_0%,transparent_35%),radial-gradient(circle_at_80%_10%,#fff275_0%,transparent_30%),radial-gradient(circle_at_10%_90%,#9bf6ff_0%,transparent_35%),radial-gradient(circle_at_85%_85%,#baffc9_0%,transparent_30%),radial-gradient(circle_at_50%_50%,#d0b3ff_0%,transparent_30%)] animate-[pulse_8s_ease-in-out_infinite] opacity-90"></div>
  );

  if (!authedRole) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <Bg />
        <header className="sticky top-0 z-10 border-b border-transparent bg-white/50 backdrop-blur-md dark:bg-slate-900/50">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="relative">
              <div className="absolute -inset-2 blur-2xl bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 opacity-40"></div>
              <div className="relative flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-pink-500" />
                <h1 className="text-lg font-extrabold bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
                  {t.appTitle}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="ml-2 flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200">
                <Languages className="h-4 w-4 text-purple-500" />
                {t.language}
                <select
                  aria-label="Language selector"
                  className="rounded-lg border border-pink-300/60 bg-white/70 p-1 shadow-sm focus:ring-2 focus:ring-pink-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </label>
              <DarkToggle />
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-6xl px-4 py-6">
          <RoleGate onPass={setAuthedRole} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Bg />
      <header className="sticky top-0 z-10 border-b border-transparent bg-white/50 backdrop-blur-md dark:bg-slate-900/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="relative">
            <div className="absolute -inset-2 blur-2xl bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 opacity-40"></div>
            <div className="relative flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-pink-500" />
              <h1 className="text-lg font-extrabold bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
                {t.appTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Chip
              icon={Globe2}
              className="!bg-white/70 !text-slate-800 border-pink-300"
            >
              {t.standards}
            </Chip>

            <span
              className={`rounded-full border px-2 py-1 text-xs font-semibold shadow-sm
                ${
                  authedRole === "teacher"
                    ? "border-yellow-400 text-yellow-900 bg-yellow-200/80"
                    : "border-teal-400 text-teal-900 bg-teal-200/80"
                }`}
            >
              Role: {authedRole}
            </span>

            <label className="ml-2 flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200">
              <Languages className="h-4 w-4 text-purple-500" />
              {t.language}
              <select
                aria-label="Language selector"
                className="rounded-lg border border-pink-300/60 bg-white/70 p-1 shadow-sm focus:ring-2 focus:ring-pink-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </label>

            <DarkToggle />

            <button
              onClick={logout}
              className="rounded-xl border border-white/60 bg-white/70 px-3 py-2 text-sm text-slate-800 shadow-sm hover:bg-white active:scale-[.98] dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-200"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-6">
        {/* Hero */}
        <section className="mb-6 rounded-2xl bg-gradient-to-r from-pink-50 to-yellow-50 p-6 ring-1 ring-inset ring-slate-200 dark:from-slate-800/60 dark:to-slate-800/30 dark:ring-slate-700">
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-slate-700 dark:text-slate-200">
              {t.heroBlurb}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setTab("path");
                  const el = document.querySelector("#learning-path");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-xl bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 active:scale-[.98] transition"
                type="button"
              >
                {t.start}
              </button>
              <button
                onClick={() => setTab("learn")}
                className="rounded-xl border border-blue-200 bg-white px-4 py-2 text-blue-700 shadow-sm hover:bg-blue-50 active:scale-[.98] transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                type="button"
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
              type="button"
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        {/* Routed content */}
        {tab === "learn" && <Learn />}
        {tab === "path" && <LearningPath role={authedRole} />}
        {tab === "resources" && <Resources />}
      </main>

      <footer className="relative z-10 mt-10 border-t border-white/50 bg-white/60 py-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-4 text-xs text-slate-700 dark:text-slate-300">
          <p>
            Educational demo. Do not use for real cryptographic security. ©Besoangel{" "}
            {new Date().getFullYear()} PQC in HS Curriculum.
          </p>
        </div>
      </footer>
    </div>
  );
}
