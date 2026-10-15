"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Send, ArrowRight, Info } from "lucide-react";
import Owl from "./Owl";
import { WhatsAppIcon } from "../icons/Brand";
import { answer, greeting, starterChips, type Answer } from "@/lib/assistant";

type Msg = { id: number; from: "bot" | "user"; text: string; actions?: Answer["actions"]; followUps?: string[] };

const SS_KEY = "ollie-greeted";
const ssGet = (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } };
const ssSet = (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch { /* storage unavailable */ } };

export default function AskUs() {
  const pathname = usePathname();
  const onCollege = pathname.startsWith("/college");
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  // Separate conversations: S Packery (firm) vs EZ Accounting College
  const [threads, setThreads] = useState<{ firm: Msg[]; college: Msg[] }>({ firm: [], college: [] });
  const ctx: "firm" | "college" = onCollege ? "college" : "firm";
  const msgs = threads[ctx];
  const setMsgs = useCallback((fn: (m: Msg[]) => Msg[]) => {
    setThreads((t) => ({ ...t, [ctx]: fn(t[ctx]) }));
  }, [ctx]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [bubble, setBubble] = useState(false);
  const [pupils, setPupils] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [wave, setWave] = useState(false);

  const owlRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;

  /* ---------- character life: eye tracking, blinking, waving ---------- */
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = owlRef.current?.getBoundingClientRect();
        if (!r) return;
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.4);
        const d = Math.hypot(dx, dy) || 1, m = Math.min(4, d / 60);
        setPupils({ x: (dx / d) * m, y: (dy / d) * m });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => { setBlink(true); setTimeout(() => setBlink(false), 140); loop(); }, 2600 + Math.random() * 2600);
    };
    loop();
    return () => clearTimeout(t);
  }, [reduce]);

  const doWave = useCallback(() => { setWave(true); setTimeout(() => setWave(false), 1150); }, []);

  // Greeting bubble once per session (after a short delay)
  useEffect(() => {
    if (ssGet(SS_KEY)) return;
    const t = setTimeout(() => { setBubble(true); doWave(); }, 4500);
    return () => clearTimeout(t);
  }, [doWave]);

  /* ---------- chat ---------- */
  const startConversation = useCallback(() => {
    setMsgs((m) => m.length ? m : [{
      id: nextId(), from: "bot",
      text: onCollege ? greeting.college : greeting.firm,
      followUps: onCollege ? starterChips.college : starterChips.firm,
    }]);
  }, [onCollege, setMsgs]);

  const openChat = () => {
    setOpen(true); setBubble(false); ssSet(SS_KEY, "1"); startConversation();
    setTimeout(() => inputRef.current?.focus(), 350);
  };
  const closeChat = () => setOpen(false);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMsgs((m) => [...m.map((x) => ({ ...x, followUps: undefined })), { id: nextId(), from: "user", text: q }]);
    setInput("");
    setTyping(true);
    const a = answer(q, onCollege);
    const delay = reduce ? 150 : Math.min(1300, 450 + a.text.length * 4);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: nextId(), from: "bot", ...a }]);
    }, delay);
  };

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, typing, reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeChat();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // the mobile bar's owl opens the panel through this event
  useEffect(() => {
    const on = () => openChat();
    window.addEventListener("ollie:open", on);
    return () => window.removeEventListener("ollie:open", on);
  });

  // auto-hide the desktop greeting bubble after a while
  useEffect(() => {
    if (!bubble) return;
    const t = setTimeout(() => setBubble(false), 12000);
    return () => clearTimeout(t);
  }, [bubble]);

  // greet in the new context if the panel is reopened there
  useEffect(() => { if (open) startConversation(); }, [open, startConversation]);

  // close the panel on navigation (keeps the conversation)
  useEffect(() => { setOpen(false); }, [pathname]);

  const theme = onCollege
    ? { head: "bg-ez-deep", user: "bg-ez-emerald", chip: "hover:border-ez-emerald hover:text-ez-emerald", primary: "bg-ez-gold text-ez-deep hover:bg-ez-light", ring: "focus:ring-ez-emerald/20 focus:border-ez-emerald", send: "bg-ez-emerald" }
    : { head: "bg-navy-950", user: "bg-navy-900", chip: "hover:border-accent-500 hover:text-accent-600", primary: "bg-accent-500 text-navy-950 hover:bg-accent-400", ring: "focus:ring-accent-500/20 focus:border-accent-500", send: "bg-navy-900" };

  return (
    <>
      {/* ---------- launcher ---------- */}
      <div className="fixed bottom-6 right-6 z-50 hidden items-end gap-2 md:flex">
        <AnimatePresence>
          {bubble && !open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative mb-14 max-w-[15rem] rounded-2xl rounded-br-sm border border-slate-200 bg-white p-4 pr-8 text-sm text-slate-700 shadow-2xl shadow-navy-900/15"
            >
              <button type="button" onClick={() => { setBubble(false); ssSet(SS_KEY, "1"); }} aria-label="Dismiss" className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-slate-400 hover:bg-slate-100">
                <X className="h-3.5 w-3.5" />
              </button>
              <p className="font-semibold text-navy-900">{onCollege ? "Thinking of applying? 🎓" : "Hi, I'm Ollie! 👋"}</p>
              <p className="mt-1">{onCollege ? "Ask me how to join EZ Accounting College." : "Need a quote, SARS help or an audit? Ask me."}</p>
              <button type="button" onClick={openChat} className="mt-2 font-semibold text-accent-600 hover:underline">Ask a question →</button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col items-center">
          <motion.button
            ref={owlRef}
            type="button"
            onClick={open ? closeChat : openChat}
            onMouseEnter={doWave}
            aria-label={open ? "Close the Ask us assistant" : "Open the Ask us assistant"}
            aria-expanded={open}
            aria-controls="ask-us-panel"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            initial={reduce ? false : { scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 16, delay: 1.2 }}
            className="relative drop-shadow-[0_10px_20px_rgba(21,24,41,0.35)]"
          >
            <Owl size={78} pupils={pupils} blink={blink} wave={wave} cap={onCollege} />
          </motion.button>
          <span className={`-mt-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg ${onCollege ? "bg-ez-emerald" : "bg-navy-900"}`}>
            {open ? "Close" : "Ask us"}
          </span>
        </div>
      </div>

      {/* ---------- panel ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="ask-us-panel"
            role="dialog"
            aria-label="Ask us assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-x-3 bottom-3 top-20 z-[60] flex origin-bottom-right flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-navy-900/25 md:inset-auto md:bottom-32 md:right-6 md:h-[min(34rem,calc(100svh-14rem))] md:w-[24rem]"
          >
            {/* header */}
            <div className={`relative flex items-center gap-3 overflow-hidden px-5 py-4 text-white ${theme.head}`}>
              <div className="grid-lines absolute inset-0 opacity-60" aria-hidden />
              <div className="relative -my-2"><Owl size={44} pupils={pupils} blink={blink} cap={onCollege} idle={false} /></div>
              <div className="relative flex-1">
                <p className="font-display text-base font-bold leading-tight">{onCollege ? "Ask EZ College" : "Ask S Packery"}</p>
                <p className="text-xs text-white/70">Ollie · instant answers, or chat with our team</p>
              </div>
              <button type="button" onClick={closeChat} aria-label="Close" className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* messages */}
            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-5" aria-live="polite">
              {msgs.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "items-end gap-2"}`}
                >
                  {m.from === "bot" && <span className="mb-1 shrink-0"><Owl size={26} idle={false} cap={onCollege} /></span>}
                  <div className={`max-w-[85%] ${m.from === "user" ? "" : "space-y-2.5"}`}>
                    <p className={`whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.from === "user" ? `${theme.user} rounded-br-sm text-white` : "rounded-bl-sm border border-slate-200 bg-white text-slate-700"}`}>
                      {m.text}
                    </p>
                    {m.actions && (
                      <div className="flex flex-wrap gap-2">
                        {m.actions.map((a) => {
                          const cls = a.kind === "whatsapp"
                            ? "bg-[#25D366] text-white hover:bg-[#1ebe5b]"
                            : a.kind === "primary" ? theme.primary : "border border-slate-200 bg-white text-navy-900 hover:bg-slate-100";
                          const inner = <>{a.kind === "whatsapp" && <WhatsAppIcon className="h-4 w-4" />}{a.label}{a.kind !== "whatsapp" && <ArrowRight className="h-3.5 w-3.5" />}</>;
                          const base = `inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition ${cls}`;
                          return a.external
                            ? <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer" className={base}>{inner}</a>
                            : <Link key={a.label} href={a.href} onClick={() => { if (a.href.includes("#")) setOpen(false); }} className={base}>{inner}</Link>;
                        })}
                      </div>
                    )}
                    {m.followUps && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {m.followUps.map((c) => (
                          <button key={c} type="button" onClick={() => ask(c)} className={`rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition ${theme.chip}`}>
                            {c}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex items-end gap-2">
                  <Owl size={26} idle={false} cap={onCollege} />
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3.5" aria-label="Ollie is typing">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="h-2 w-2 rounded-full bg-slate-400"
                        animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* input */}
            <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="border-t border-slate-200 bg-white p-3">
              <div className="flex items-center gap-2">
                <label htmlFor="ask-input" className="sr-only">Type your question</label>
                <input
                  id="ask-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={onCollege ? "e.g. What do I need to apply?" : "e.g. I received a letter from SARS"}
                  autoComplete="off"
                  maxLength={300}
                  className={`flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 ${theme.ring}`}
                />
                <button type="submit" disabled={!input.trim() || typing} aria-label="Send" className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition disabled:opacity-40 ${theme.send}`}>
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-slate-400">
                <Info className="h-3 w-3" /> General info only, not advice · chats aren&apos;t stored
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
