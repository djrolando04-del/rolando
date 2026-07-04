import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  FileText,
  Image,
  FileSpreadsheet,
  File,
  ExternalLink,
  Loader2,
  LogOut,
  FolderOpen,
  Cloud,
  CheckCircle,
} from "lucide-react";
import { GoogleDriveFile, listDriveFiles } from "../lib/googleDrive";
import { googleSignIn, logout, getAccessToken, initAuth } from "../lib/driveAuth";
import { SiteTheme } from "../types";
import { User } from "firebase/auth";

interface DriveExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (file: GoogleDriveFile) => void;
  theme?: SiteTheme;
}

export default function DriveExplorerModal({
  isOpen,
  onClose,
  onSelectFile,
  theme,
}: DriveExplorerModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const [files, setFiles] = useState<GoogleDriveFile[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>(""); // "", "document", "image", "spreadsheet"
  const [error, setError] = useState<string | null>(null);

  const isNatural = theme?.id === "natural-tones";

  // Check auth state on load
  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        fetchFiles(accessToken, searchQuery, filterType);
      },
      () => {
        setUser(null);
        setToken(null);
        setFiles([]);
      }
    );

    return () => unsubscribe();
  }, [isOpen]);

  // Handle re-fetching files when filters or search query changes
  useEffect(() => {
    if (token) {
      const delayDebounceFn = setTimeout(() => {
        fetchFiles(token, searchQuery, filterType);
      }, 350);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery, filterType, token]);

  const fetchFiles = async (accessToken: string, query: string, type: string) => {
    setLoading(true);
    setError(null);
    try {
      const driveFiles = await listDriveFiles(accessToken, query, type);
      setFiles(driveFiles);
    } catch (err: any) {
      console.error(err);
      setError(
        "No se pudieron cargar los archivos de Google Drive. Es posible que debas iniciar sesión de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setSigningIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        fetchFiles(result.accessToken, searchQuery, filterType);
      }
    } catch (err: any) {
      console.error(err);
      setError("Error de autenticación: " + (err.message || "Por favor intente nuevamente."));
    } finally {
      setSigningIn(false);
    }
  };

  const handleLogout = async () => {
    setError(null);
    try {
      await logout();
      setUser(null);
      setToken(null);
      setFiles([]);
    } catch (err: any) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes("folder")) return <FolderOpen className="w-5 h-5 text-amber-500" />;
    if (mimeType.includes("image")) return <Image className="w-5 h-5 text-emerald-500" />;
    if (mimeType.includes("spreadsheet") || mimeType.includes("sheet"))
      return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
    if (mimeType.includes("document") || mimeType.includes("pdf"))
      return <FileText className="w-5 h-5 text-blue-500" />;
    return <File className="w-5 h-5 text-slate-500" />;
  };

  const formatSize = (bytes?: string) => {
    if (!bytes) return "—";
    const num = parseInt(bytes, 10);
    if (isNaN(num)) return "—";
    if (num < 1024) return `${num} B`;
    if (num < 1048576) return `${(num / 1024).toFixed(1)} KB`;
    return `${(num / 1048576).toFixed(1)} MB`;
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "—";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("es-DO", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div
        className={`w-full max-w-3xl bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[85vh] ${
          isNatural ? "font-serif text-[#3A3830]" : "font-sans text-slate-800"
        }`}
      >
        {/* Header */}
        <div
          className={`px-5 py-4 flex items-center justify-between border-b border-slate-150 ${
            isNatural ? "bg-[#F7F4EB]" : "bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
              <Cloud className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                Conectar con Google Drive
              </h3>
              <p className="text-3xs text-slate-500 font-medium">
                Selecciona tus evidencias reales directamente desde tu almacenamiento en la nube
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Status & Body */}
        {!user ? (
          /* Login Screen */
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border border-blue-100 mx-auto">
                <Cloud className="w-8 h-8 text-blue-500" />
              </div>
              <div className="absolute -top-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="max-w-md space-y-2">
              <h4 className="text-xs font-bold text-slate-800">
                Inicia sesión para buscar tus evidencias
              </h4>
              <p className="text-2xs text-slate-500 leading-relaxed">
                Al conectar tu cuenta de UAPA o de Gmail personal, podrás ver tus documentos, PDFs e
                imágenes de tareas completadas para vincularlas directamente a este portafolio digital.
              </p>
            </div>

            {error && (
              <div className="text-2xs text-red-600 bg-red-50 border border-red-200/50 rounded-lg p-3 max-w-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={signingIn}
              className="gsi-material-button shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex"
            >
              <div className="gsi-material-button-state"></div>
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  {signingIn ? (
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  ) : (
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      style={{ display: "block" }}
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      ></path>
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      ></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  )}
                </div>
                <span className="gsi-material-button-contents text-slate-700 text-xs font-bold pl-2">
                  {signingIn ? "Conectando..." : "Acceder con Google Drive"}
                </span>
              </div>
            </button>

            {/* Custom styled standard CSS rules for Google button */}
            <style>{`
              .gsi-material-button {
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                -webkit-appearance: none;
                background-color: WHITE;
                background-image: none;
                border: 1px solid #747775;
                -webkit-border-radius: 8px;
                border-radius: 8px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                color: #1f1f1f;
                cursor: pointer;
                font-family: 'Roboto', arial, sans-serif;
                font-size: 14px;
                height: 40px;
                letter-spacing: 0.25px;
                outline: none;
                overflow: hidden;
                padding: 0 12px;
                position: relative;
                text-align: center;
                transition: background-color .218s, border-color .218s, box-shadow .218s;
                vertical-align: middle;
                white-space: nowrap;
                width: auto;
                max-width: 400px;
                min-width: min-content;
              }
              .gsi-material-button .gsi-material-button-icon {
                height: 20px;
                min-width: 20px;
                width: 20px;
              }
              .gsi-material-button .gsi-material-button-content-wrapper {
                align-items: center;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                height: 100%;
                justify-content: space-between;
                position: relative;
                width: 100%;
              }
              .gsi-material-button .gsi-material-button-contents {
                flex-grow: 1;
                font-family: 'Google Sans', arial, sans-serif;
                font-weight: 500;
                overflow: hidden;
                text-overflow: ellipsis;
                vertical-align: middle;
              }
              .gsi-material-button .gsi-material-button-state {
                -webkit-transition: opacity .218s;
                transition: opacity .218s;
                bottom: 0;
                left: 0;
                opacity: 0;
                position: absolute;
                right: 0;
                top: 0;
              }
              .gsi-material-button:hover {
                -webkit-box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
                box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
                background-color: #F8FAFC;
              }
            `}</style>
          </div>
        ) : (
          /* File Explorer Body */
          <div className="flex-1 flex flex-col min-h-0">
            {/* Top Bar inside explorer: User info & logout */}
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between text-xs bg-slate-50/50">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ""} className="w-6 h-6 rounded-full border border-slate-200" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-3xs">
                    {user.displayName?.charAt(0) || "U"}
                  </div>
                )}
                <span className="font-bold text-slate-700">{user.displayName || user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-slate-500 hover:text-red-600 flex items-center gap-1 font-semibold hover:bg-red-50/50 px-2 py-1 rounded-md transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Desconectar
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 border-b border-slate-150 flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar archivos por nombre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none shrink-0">
                {[
                  { label: "Todos", value: "" },
                  { label: "Documentos", value: "document" },
                  { label: "Imágenes", value: "image" },
                  { label: "Hojas de Cálculo", value: "spreadsheet" },
                ].map((btn) => (
                  <button
                    key={btn.value}
                    onClick={() => setFilterType(btn.value)}
                    className={`py-1.5 px-3 rounded-lg text-2xs font-extrabold transition-all cursor-pointer whitespace-nowrap border ${
                      filterType === btn.value
                        ? isNatural
                          ? "bg-[#5A5A40] text-white border-[#5A5A40]"
                          : "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {loading ? (
                <div className="flex flex-col items-center justify-center p-16 text-slate-400 space-y-2">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  <p className="text-2xs font-bold">Cargando archivos de Google Drive...</p>
                </div>
              ) : error ? (
                <div className="p-10 text-center space-y-3">
                  <p className="text-2xs text-red-600 font-semibold">{error}</p>
                  <button
                    onClick={() => token && fetchFiles(token, searchQuery, filterType)}
                    className="bg-slate-100 hover:bg-slate-250 text-slate-700 text-2xs font-bold py-1.5 px-3.5 rounded-lg border border-slate-300 transition-colors"
                  >
                    Reintentar cargar
                  </button>
                </div>
              ) : files.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 text-slate-400 space-y-2">
                  <Search className="w-8 h-8 text-slate-300" />
                  <p className="text-2xs font-bold">No se encontraron archivos</p>
                  <p className="text-3xs text-slate-450 text-center max-w-xs">
                    Prueba modificando la búsqueda o sube archivos reales a tu Google Drive para
                    vincularlos aquí.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      onClick={() => onSelectFile(file)}
                      className="px-5 py-3 hover:bg-blue-50/25 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="shrink-0">{getFileIcon(file.mimeType)}</div>
                        <div className="min-w-0 flex-1">
                          <p className="text-2xs font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors">
                            {file.name}
                          </p>
                          <div className="flex items-center gap-2 text-3xs text-slate-400 mt-0.5">
                            <span>Modificado: {formatDate(file.modifiedTime)}</span>
                            <span>•</span>
                            <span>Tamaño: {formatSize(file.size)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                            title="Abrir en Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <span
                          className={`text-3xs font-extrabold px-2 py-0.5 rounded-md ${
                            isNatural
                              ? "bg-[#E5E0D0] text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white"
                              : "bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white"
                          } transition-all`}
                        >
                          Seleccionar
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-150 flex justify-end">
          <button
            onClick={onClose}
            className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-2xs font-bold py-1.5 px-3.5 rounded-lg transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
