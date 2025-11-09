import type { Notifier } from './Notifier';

export class ConsoleNotifier implements Notifier {
  notify(message: string): string {
    return `Console → ${message}`;
  }
}

// Adaptee: 레거시 로거 (인터페이스가 다름)
export class LegacyLogger {
  writeLog(payload: { severity: 'info' | 'warn' | 'error'; content: string }): string {
    const prefix = payload.severity.toUpperCase();
    return `[Legacy ${prefix}] ${payload.content}`;
  }
}

// Adapter: Notifier 인터페이스에 맞추어 변환
export class LegacyLoggerAdapter implements Notifier {
  constructor(private legacy: LegacyLogger, private severity: 'info' | 'warn' | 'error' = 'info') {}
  notify(message: string): string {
    return this.legacy.writeLog({ severity: this.severity, content: message });
  }
}

