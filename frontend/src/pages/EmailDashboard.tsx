import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Code2,
  X,
  Save,
  Loader2,
  AlertCircle,
  Copy,
  CheckCheck,
  ChevronRight,
} from "lucide-react";
import { useEmailTemplates } from "../hooks/useEmailTemplates";
import { Header } from "../Components/common/Header";
import { globalToast as toast } from "../utils/toast";
import type { EmailTemplate } from "../types/emailTemplate";

// ─── Placeholder chip bar ─────────────────────────────────────────────────────

const PLACEHOLDERS = [
  { tag: "{{name}}", desc: "Member name" },
  { tag: "{{email}}", desc: "Member email" },
  { tag: "{{whatsapp_link}}", desc: "WhatsApp invite" },
  { tag: "{{discord_link}}", desc: "Discord invite" },
  { tag: "{{year}}", desc: "Current year" },
];

function PlaceholderBar({
  onInsert,
}: {
  onInsert: (tag: string) => void;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopied(tag);
    setTimeout(() => setCopied(null), 1500);
    onInsert(tag);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {PLACEHOLDERS.map(({ tag, desc }) => (
        <button
          key={tag}
          type="button"
          title={desc}
          onClick={() => copy(tag)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-cyan-400 font-mono text-xs font-bold border-2 border-cyan-400 shadow-[2px_2px_0_#00FFFF] hover:bg-cyan-400 hover:text-black transition-all"
        >
          {copied === tag ? (
            <CheckCheck className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          {tag}
        </button>
      ))}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyTemplates({ onNew }: { onNew: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-20 h-20 bg-black border-4 border-cyan-400 shadow-[6px_6px_0_#00FFFF] flex items-center justify-center mb-6">
        <Mail className="w-10 h-10 text-cyan-400" />
      </div>
      <h2 className="text-2xl font-black uppercase tracking-wider mb-2">
        No Templates Yet
      </h2>
      <p className="text-gray-500 font-mono text-sm mb-8 max-w-xs">
        Create your first email template. Use{" "}
        <span className="text-black font-bold">{"{{name}}"}</span> and other
        placeholders to personalise emails.
      </p>
      <button
        onClick={onNew}
        className="flex items-center gap-2 bg-cyan-400 border-4 border-black text-black font-black px-6 py-3 shadow-[4px_4px_0_#000] hover:bg-black hover:text-cyan-400 transition-all"
      >
        <Plus className="w-5 h-5" />
        New Template
      </button>
    </motion.div>
  );
}

// ─── Template card ────────────────────────────────────────────────────────────

function TemplateCard({
  template,
  onEdit,
  onPreview,
  onDelete,
  isDeleting,
}: {
  template: EmailTemplate;
  onEdit: () => void;
  onPreview: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  const isWelcome = template.name === "welcome";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="bg-white border-4 border-black shadow-[6px_6px_0_#00FFFF,10px_10px_0_#000] p-6 flex flex-col gap-4"
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-lg uppercase tracking-wide truncate">
              {template.name}
            </span>
            {isWelcome && (
              <span className="px-2 py-0.5 bg-cyan-400 border-2 border-black text-black text-xs font-black uppercase">
                Active
              </span>
            )}
          </div>
          <p className="text-sm font-mono text-gray-500 mt-1 truncate">
            {template.subject}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
      </div>

      {/* Preview snippet */}
      <div className="bg-gray-50 border-2 border-gray-200 p-3 font-mono text-xs text-gray-600 line-clamp-3 leading-relaxed">
        {template.htmlBody.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}
      </div>

      {/* Footer: meta + actions */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-gray-400">
          Updated {new Date(template.updatedAt).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-2">
          <button
            id={`preview-template-${template.id}`}
            onClick={onPreview}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-black text-black font-bold text-xs shadow-[2px_2px_0_#000] hover:bg-black hover:text-white transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
          <button
            id={`edit-template-${template.id}`}
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black border-2 border-black text-cyan-400 font-bold text-xs shadow-[2px_2px_0_#00FFFF] hover:bg-cyan-400 hover:text-black transition-all"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            id={`delete-template-${template.id}`}
            onClick={onDelete}
            disabled={isDeleting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-red-500 text-red-500 font-bold text-xs shadow-[2px_2px_0_#ef4444] hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Editor panel ─────────────────────────────────────────────────────────────

type EditorTab = "html" | "text";

interface EditorForm {
  name: string;
  subject: string;
  htmlBody: string;
  textBody: string;
}

function EditorPanel({
  initial,
  isSaving,
  onSave,
  onCancel,
}: {
  initial: EditorForm;
  isSaving: boolean;
  onSave: (form: EditorForm) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<EditorForm>(initial);
  const [tab, setTab] = useState<EditorTab>("html");

  const set = (key: keyof EditorForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Insert placeholder at cursor position in active textarea
  const insertAtCursor = (tag: string) => {
    const textareaId = tab === "html" ? "email-htmlBody" : "email-textBody";
    const el = document.getElementById(textareaId) as HTMLTextAreaElement | null;
    if (!el) return;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const field: keyof EditorForm = tab === "html" ? "htmlBody" : "textBody";
    const newVal = el.value.slice(0, start) + tag + el.value.slice(end);
    setForm((f) => ({ ...f, [field]: newVal }));
    // Restore cursor after React re-render
    setTimeout(() => {
      el.selectionStart = el.selectionEnd = start + tag.length;
      el.focus();
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.subject.trim() || !form.htmlBody.trim()) {
      toast.error("Name, subject and HTML body are required.");
      return;
    }
    onSave(form);
  };

  return (
    <motion.div
      key="editor"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      className="bg-white border-4 border-black shadow-[8px_8px_0_#00FFFF,12px_12px_0_#000] p-6 flex flex-col gap-5"
    >
      {/* Panel header */}
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <h2 className="font-black uppercase tracking-widest text-lg flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" />
          {initial.name ? "Edit Template" : "New Template"}
        </h2>
        <button
          onClick={onCancel}
          className="w-8 h-8 flex items-center justify-center border-2 border-black bg-white hover:bg-black hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="font-black uppercase text-xs tracking-widest">
            Template Name <span className="text-red-500">*</span>
          </label>
          <input
            id="email-name"
            value={form.name}
            onChange={set("name")}
            placeholder='e.g. "welcome"'
            className="border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[2px_2px_0_#00FFFF]"
          />
          <p className="text-xs font-mono text-gray-400">
            Use <strong>welcome</strong> to override the approval email
          </p>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1.5">
          <label className="font-black uppercase text-xs tracking-widest">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            id="email-subject"
            value={form.subject}
            onChange={set("subject")}
            placeholder="Welcome to Call of Code, {{name}}!"
            className="border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[2px_2px_0_#00FFFF]"
          />
        </div>

        {/* Placeholder chips */}
        <div className="flex flex-col gap-2">
          <label className="font-black uppercase text-xs tracking-widest">
            Insert Placeholder
          </label>
          <PlaceholderBar onInsert={insertAtCursor} />
        </div>

        {/* Body tabs */}
        <div className="flex flex-col gap-2">
          <div className="flex border-2 border-black">
            {(["html", "text"] as EditorTab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex-1 py-2 font-black uppercase text-xs tracking-widest transition-all
                  ${tab === t
                    ? "bg-cyan-400 text-black"
                    : "bg-white text-black hover:bg-gray-100"
                  }
                  ${t === "text" ? "border-l-2 border-black" : ""}`}
              >
                {t === "html" ? "HTML Body" : "Plain Text"}
              </button>
            ))}
          </div>

          {tab === "html" ? (
            <textarea
              id="email-htmlBody"
              key="htmlBody"
              value={form.htmlBody}
              onChange={set("htmlBody")}
              rows={14}
              placeholder={"<h1>Hello {{name}}</h1>\n<p>Join our WhatsApp: {{whatsapp_link}}</p>"}
              className="border-2 border-black px-3 py-2 font-mono text-xs focus:outline-none focus:border-cyan-400 focus:shadow-[2px_2px_0_#00FFFF] resize-y"
            />
          ) : (
            <textarea
              id="email-textBody"
              key="textBody"
              value={form.textBody}
              onChange={set("textBody")}
              rows={8}
              placeholder={"Hello {{name}},\n\nYour membership has been approved!"}
              className="border-2 border-black px-3 py-2 font-mono text-xs focus:outline-none focus:border-cyan-400 focus:shadow-[2px_2px_0_#00FFFF] resize-y"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 border-t-2 border-black">
          <button
            type="submit"
            disabled={isSaving}
            id="save-template-btn"
            className="flex items-center gap-2 bg-cyan-400 border-4 border-black text-black font-black px-6 py-2.5 shadow-[4px_4px_0_#000] hover:bg-black hover:text-cyan-400 transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Template
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="font-black uppercase text-sm px-4 py-2.5 border-2 border-black hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// ─── Preview modal ─────────────────────────────────────────────────────────────

function PreviewModal({
  template,
  onClose,
}: {
  template: EmailTemplate;
  onClose: () => void;
}) {
  const [view, setView] = useState<"rendered" | "source">("rendered");

  // Inject demo values for preview
  const demo: Record<string, string> = {
    name: "Alex",
    email: "alex@example.com",
    whatsapp_link: "https://chat.whatsapp.com/example",
    discord_link: "https://discord.gg/example",
    year: new Date().getFullYear().toString(),
  };

  const resolved = template.htmlBody.replace(
    /\{\{(\w+)\}\}/g,
    (_, key) => demo[key] ?? `{{${key}}}`
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-white border-4 border-black shadow-[8px_8px_0_#00FFFF,12px_12px_0_#000] w-full max-w-3xl max-h-[90vh] flex flex-col"
        >
          {/* Modal header */}
          <div className="flex items-center justify-between px-6 py-4 border-b-4 border-black bg-black">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-cyan-400 font-black uppercase tracking-widest text-sm">
                  Preview — {template.name}
                </p>
                <p className="text-gray-400 font-mono text-xs mt-0.5">
                  Subject: {template.subject}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 border-2 border-cyan-400 text-cyan-400 flex items-center justify-center hover:bg-cyan-400 hover:text-black transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Demo notice */}
          <div className="px-6 py-2 bg-cyan-400/20 border-b-2 border-black flex items-center gap-2 text-xs font-mono">
            <AlertCircle className="w-3.5 h-3.5 text-black shrink-0" />
            Placeholders replaced with demo values for preview
          </div>

          {/* View toggle */}
          <div className="px-6 pt-4 flex gap-2">
            {(["rendered", "source"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 font-black uppercase text-xs border-2 border-black transition-all
                  ${view === v ? "bg-black text-cyan-400" : "bg-white text-black hover:bg-gray-100"}`}
              >
                {v === "rendered" ? "Rendered" : "HTML Source"}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto m-4 border-2 border-black">
            {view === "rendered" ? (
              <iframe
                srcDoc={resolved}
                title="Email preview"
                className="w-full h-full min-h-[400px] border-none"
                sandbox="allow-same-origin"
              />
            ) : (
              <pre className="p-4 font-mono text-xs whitespace-pre-wrap text-gray-700 bg-gray-50 min-h-[400px]">
                {template.htmlBody}
              </pre>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

type EditorMode = { type: "create" } | { type: "edit"; template: EmailTemplate } | null;

const EMPTY_FORM: EditorForm = { name: "", subject: "", htmlBody: "", textBody: "" };

export default function EmailDashboard() {
  const { templates, isLoading, isError, create, update, remove } =
    useEmailTemplates();
  const [editor, setEditor] = useState<EditorMode>(null);
  const [preview, setPreview] = useState<EmailTemplate | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const openNew = () => setEditor({ type: "create" });
  const openEdit = (t: EmailTemplate) => setEditor({ type: "edit", template: t });
  const closeEditor = () => setEditor(null);

  const handleSave = (form: EditorForm) => {
    if (!editor) return;

    const payload = {
      name:     form.name.trim(),
      subject:  form.subject.trim(),
      htmlBody: form.htmlBody,
      textBody: form.textBody.trim() || undefined,
    };

    if (editor.type === "create") {
      create.mutate(payload, { onSuccess: closeEditor });
    } else {
      update.mutate(
        { id: editor.template.id, payload },
        { onSuccess: closeEditor }
      );
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this template? This cannot be undone.")) return;
    setDeletingId(id);
    remove.mutate(id, { onSettled: () => setDeletingId(null) });
  };

  const isSaving = create.isPending || update.isPending;

  const initialForm: EditorForm =
    editor?.type === "edit"
      ? {
          name:     editor.template.name,
          subject:  editor.template.subject,
          htmlBody: editor.template.htmlBody,
          textBody: editor.template.textBody ?? "",
        }
      : EMPTY_FORM;

  return (
    <div className="relative overflow-hidden pt-[80px] space-y-6 pb-16">
      {/* Fixed header */}
      <Header title="" subtitle="EMAIL_TEMPLATES" onBack={undefined} />

      {/* Toolbar */}
      <div className="px-8 flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl uppercase tracking-tight">
            Email Templates
          </h1>
          <p className="text-gray-500 font-mono text-sm mt-0.5">
            The <strong>welcome</strong> template is used for member approval emails
          </p>
        </div>
        <button
          id="new-template-btn"
          onClick={openNew}
          className="flex items-center gap-2 bg-cyan-400 border-4 border-black text-black font-black px-5 py-2.5 shadow-[4px_4px_0_#000] hover:bg-black hover:text-cyan-400 transition-all"
        >
          <Plus className="w-5 h-5" />
          New Template
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
            <span className="font-black uppercase tracking-widest text-sm">
              Loading templates...
            </span>
          </div>
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="mx-8">
          <div className="border-4 border-black bg-white p-8 shadow-[6px_6px_0_#FF4444,10px_10px_0_#000] flex items-center gap-4">
            <AlertCircle className="w-8 h-8 text-red-500 shrink-0" />
            <div>
              <p className="font-black uppercase">Failed to load templates</p>
              <p className="text-sm font-mono text-gray-500 mt-1">
                Check that the COC Admin backend can reach the COC-API.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main two-col layout */}
      {!isLoading && (
        <div className="px-8">
          <div
            className={`grid gap-8 transition-all duration-200 ${
              editor ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
            }`}
          >
            {/* Left: Template list */}
            <div className="flex flex-col gap-5">
              {templates.length === 0 && !isError ? (
                <EmptyTemplates onNew={openNew} />
              ) : (
                <AnimatePresence>
                  {templates.map((t) => (
                    <TemplateCard
                      key={t.id}
                      template={t}
                      onEdit={() => openEdit(t)}
                      onPreview={() => setPreview(t)}
                      onDelete={() => handleDelete(t.id)}
                      isDeleting={deletingId === t.id}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Right: Editor panel */}
            <AnimatePresence mode="wait">
              {editor && (
                <div className="lg:sticky lg:top-[100px] lg:self-start">
                  <EditorPanel
                    key={editor.type === "edit" ? editor.template.id : "create"}
                    initial={initialForm}
                    isSaving={isSaving}
                    onSave={handleSave}
                    onCancel={closeEditor}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Preview modal */}
      <AnimatePresence>
        {preview && (
          <PreviewModal template={preview} onClose={() => setPreview(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
