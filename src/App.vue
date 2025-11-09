<template>
  <main class="container">
    <h1>Design Patterns Demo (Vue + TypeScript)</h1>

    <section class="section">
      <h2>1) Factory Method</h2>
      <div class="controls">
        <label>
          Creator 선택:
          <select v-model="factorySelected">
            <option value="web">WebDialog</option>
            <option value="windows">WindowsDialog</option>
          </select>
        </label>
      </div>
      <div class="preview">
        <p class="hint">Creator가 Factory Method로 Product(Button)를 생성합니다.</p>
        <button :class="['app-btn', factorySelected]" @click="onFactoryClick">
          {{ factoryLabel }}
        </button>
        <p class="message">{{ factoryMessage }}</p>
      </div>
    </section>

    <section class="section">
      <h2>2) Adapter</h2>
      <div class="controls">
        <label>
          Notifier 선택:
          <select v-model="adapterSelected">
            <option value="console">ConsoleNotifier</option>
            <option value="legacy-info">LegacyLoggerAdapter (info)</option>
            <option value="legacy-warn">LegacyLoggerAdapter (warn)</option>
          </select>
        </label>
      </div>
      <div class="preview">
        <input class="text" v-model="adapterInput" placeholder="메시지를 입력" />
        <button class="app-btn web" @click="onNotify">Notify</button>
        <p class="message">{{ adapterMessage }}</p>
      </div>
    </section>

    <section class="section">
      <h2>3) Strategy</h2>
      <div class="controls">
        <label>
          Strategy 선택:
          <select v-model="strategySelected">
            <option value="upper">UpperCase</option>
            <option value="lower">LowerCase</option>
            <option value="title">TitleCase</option>
          </select>
        </label>
      </div>
      <div class="preview">
        <input class="text" v-model="strategyInput" placeholder="텍스트를 입력" />
        <button class="app-btn windows" @click="onTransform">Transform</button>
        <p class="message">{{ strategyOutput }}</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { WebDialog, WindowsDialog } from './factory/ConcreteCreators';
import type { Dialog } from './factory/Creator';
import { ConsoleNotifier, LegacyLogger, LegacyLoggerAdapter } from './adapter/ConcreteTargets';
import type { Notifier } from './adapter/Notifier';
import { TextContext, UpperCaseFormatter, LowerCaseFormatter, TitleCaseFormatter } from './strategy/TextStrategy';

// Factory Method state
type Kind = 'web' | 'windows';
const factorySelected = ref<Kind>('web');
const factoryDialog = computed<Dialog>(() => (factorySelected.value === 'web' ? new WebDialog() : new WindowsDialog()));
const factoryLabel = ref('');
const factoryMessage = ref('');
watchEffect(() => {
  const { label: l } = factoryDialog.value.render();
  factoryLabel.value = l;
  factoryMessage.value = '(버튼을 클릭해 동작 메시지를 확인)';
});
function onFactoryClick() {
  const { messageOnClick } = factoryDialog.value.render();
  factoryMessage.value = messageOnClick;
}

// Adapter state
type AdapterKind = 'console' | 'legacy-info' | 'legacy-warn';
const adapterSelected = ref<AdapterKind>('console');
const adapterInput = ref('Hello Adapter');
const adapter = computed<Notifier>(() => {
  if (adapterSelected.value === 'console') return new ConsoleNotifier();
  const legacy = new LegacyLogger();
  return new LegacyLoggerAdapter(legacy, adapterSelected.value === 'legacy-warn' ? 'warn' : 'info');
});
const adapterMessage = ref('');
function onNotify() {
  adapterMessage.value = adapter.value.notify(adapterInput.value || '(empty)');
}

// Strategy state
type StrategyKind = 'upper' | 'lower' | 'title';
const strategySelected = ref<StrategyKind>('upper');
const strategyInput = ref('the quick brown fox');
const context = ref(new TextContext(new UpperCaseFormatter()));
const strategyOutput = ref('');
watchEffect(() => {
  const formatter =
    strategySelected.value === 'upper'
      ? new UpperCaseFormatter()
      : strategySelected.value === 'lower'
      ? new LowerCaseFormatter()
      : new TitleCaseFormatter();
  context.value.setStrategy(formatter);
  strategyOutput.value = context.value.transform(strategyInput.value);
});
function onTransform() {
  strategyOutput.value = context.value.transform(strategyInput.value);
}
</script>

<style scoped>
.container {
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, Apple Color Emoji, Segoe UI Emoji;
  padding: 2rem;
  max-width: 720px;
  margin: 0 auto;
}
h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.controls {
  margin-bottom: 1rem;
}
.hint {
  color: #6b7280;
  font-size: 0.9rem;
}
.preview {
  display: grid;
  gap: 0.5rem;
  align-items: start;
}
.section { margin-bottom: 2rem; }
.app-btn {
  appearance: none;
  border: 0;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.app-btn.web {
  background: #2563eb;
  color: white;
}
.app-btn.windows {
  background: #0ea5e9;
  color: white;
}
.message {
  min-height: 1.5rem;
}
.text { padding: 0.5rem 0.6rem; border: 1px solid #e5e7eb; border-radius: 6px; }
code {
  background: #f3f4f6;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
}
</style>
