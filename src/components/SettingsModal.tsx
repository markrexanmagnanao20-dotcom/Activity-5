/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AudioSettings, VideoSettings } from '../types/game';
import { X, Volume2, VolumeX, Sparkles, Smartphone, Info } from 'lucide-react';

interface SettingsModalProps {
  audio: AudioSettings;
  video: VideoSettings;
  onUpdateAudio: (audio: AudioSettings) => void;
  onUpdateVideo: (video: VideoSettings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  audio,
  video,
  onUpdateAudio,
  onUpdateVideo,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
            CONFIGURATION
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audio Section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <span>Audio Diagnostics</span>
            <button
              onClick={() => onUpdateAudio({ ...audio, muted: !audio.muted })}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
            >
              {audio.muted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{audio.muted ? 'Unmute All' : 'Mute All'}</span>
            </button>
          </div>

          {/* Master Volume */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Master Volume</span>
              <span className="font-mono">{Math.round(audio.masterVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audio.masterVolume}
              onChange={(e) => onUpdateAudio({ ...audio, masterVolume: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* SFX Volume */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Weapons & SFX</span>
              <span className="font-mono">{Math.round(audio.sfxVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audio.sfxVolume}
              onChange={(e) => onUpdateAudio({ ...audio, sfxVolume: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Music Volume */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Synthesizer Music</span>
              <span className="font-mono">{Math.round(audio.musicVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audio.musicVolume}
              onChange={(e) => onUpdateAudio({ ...audio, musicVolume: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Graphics & Gameplay */}
        <div className="space-y-4 mb-6">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            Display & Controls
          </div>

          {/* Screen Shake */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300">Kinetic Screen Shake</span>
            <button
              onClick={() => onUpdateVideo({ ...video, screenShake: !video.screenShake })}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                video.screenShake ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {video.screenShake ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Auto Fire */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300">Continuous Auto-Fire</span>
            <button
              onClick={() => onUpdateVideo({ ...video, autoFire: !video.autoFire })}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                video.autoFire ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {video.autoFire ? 'Active' : 'Manual'}
            </button>
          </div>

          {/* Touch Controls Toggle */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-slate-300">
              <Smartphone className="w-3.5 h-3.5 text-slate-400" />
              On-Screen Virtual Controls
            </span>
            <button
              onClick={() => onUpdateVideo({ ...video, showTouchControls: !video.showTouchControls })}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                video.showTouchControls ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {video.showTouchControls ? 'Force On' : 'Automatic'}
            </button>
          </div>

          {/* Particle Quality */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                VFX Particle Density
              </span>
              <span className="font-mono text-cyan-400">{video.particleQuality}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['LOW', 'MEDIUM', 'HIGH'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => onUpdateVideo({ ...video, particleQuality: q })}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                    video.particleQuality === q
                      ? 'bg-slate-800 border-cyan-400 text-cyan-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Display & Scaling Calibration */}
        <div className="space-y-4 mb-6 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>Display Scaling & Touch Calibration</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            Adjust display scaling for optimal touch response and visibility on your mobile device:
          </p>

          {/* UI Scale */}
          <div>
            <div className="flex justify-between items-center text-xs text-slate-300 mb-1.5">
              <span className="font-semibold">UI Scale</span>
              <span className="font-mono text-cyan-400 text-[11px]">
                {video.uiScale === 'SMALL' ? 'Small' : video.uiScale === 'LARGE' ? 'Large' : 'Medium'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {([
                { key: 'SMALL', label: 'Small' },
                { key: 'MEDIUM', label: 'Medium' },
                { key: 'LARGE', label: 'Large' },
              ] as const).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => onUpdateVideo({ ...video, uiScale: key })}
                  className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    video.uiScale === key
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Display Mode */}
          <div>
            <div className="flex justify-between items-center text-xs text-slate-300 mb-1.5">
              <span className="font-semibold">Display Mode</span>
              <span className="font-mono text-cyan-400 text-[11px]">
                {video.displayMode === 'FIT_SCREEN' ? 'Fit Screen' : video.displayMode === 'FULLSCREEN' ? 'Fullscreen' : 'Safe Area'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {([
                { key: 'FIT_SCREEN', label: 'Fit Screen' },
                { key: 'FULLSCREEN', label: 'Fullscreen' },
                { key: 'SAFE_AREA', label: 'Safe Area' },
              ] as const).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => {
                    try {
                      if (key === 'FULLSCREEN') {
                        if (
                          typeof document !== 'undefined' &&
                          document.fullscreenEnabled &&
                          !document.fullscreenElement &&
                          typeof document.documentElement?.requestFullscreen === 'function'
                        ) {
                          const res = document.documentElement.requestFullscreen();
                          if (res && typeof res.catch === 'function') {
                            res.catch(() => {});
                          }
                        }
                      } else if (
                        typeof document !== 'undefined' &&
                        document.fullscreenElement &&
                        typeof document.exitFullscreen === 'function'
                      ) {
                        const res = document.exitFullscreen();
                        if (res && typeof res.catch === 'function') {
                          res.catch(() => {});
                        }
                      }
                    } catch {
                      // Safe fallback in restricted iframe or sandbox environment
                    }
                    onUpdateVideo({ ...video, displayMode: key });
                  }}
                  className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    video.displayMode === key
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div>
            <div className="flex justify-between items-center text-xs text-slate-300 mb-1.5">
              <span className="font-semibold">Aspect Ratio</span>
              <span className="font-mono text-cyan-400 text-[11px]">
                {video.aspectRatio === '16:9' ? '16:9' : video.aspectRatio === '19.5:9' ? '19.5:9' : 'Auto-Detect'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {([
                { key: '16:9', label: '16:9' },
                { key: '19.5:9', label: '19.5:9' },
                { key: 'AUTO', label: 'Auto-Detect' },
              ] as const).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => onUpdateVideo({ ...video, aspectRatio: key })}
                  className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    video.aspectRatio === key
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tip Banner */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-[11px] text-amber-200/90 shadow-inner">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-amber-300 font-bold">Tip:</strong> Increase UI Scale if buttons or vessel stats appear too small to tap comfortably.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          Confirm & Close
        </button>
      </div>
    </div>
  );
};
