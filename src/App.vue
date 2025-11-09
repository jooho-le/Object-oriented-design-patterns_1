<template>
  <main class="container">
    <h1>Design Patterns Demo (Vue + TypeScript)</h1>

    <section class="section">
      <h2>1) Builder</h2>
      <div class="controls">
        <label>
          Builder 선택:
          <select v-model="builderSelected">
            <option value="md">Markdown</option>
            <option value="html">HTML</option>
          </select>
        </label>
      </div>
      <div class="preview">
        <input class="text" v-model="builderTitle" placeholder="제목 입력" />
        <button class="app-btn web" @click="onBuild">Build Report</button>
        <p class="message"><span v-if="builderSelected==='md'">(Markdown)</span><span v-else>(HTML)</span></p>
        <pre class="code-block">{{ builtReport }}</pre>
      </div>
    </section>

    <section class="section">
      <h2>2) Decorator</h2>
      <div class="controls">
        <input class="text" v-model="decoratorInput" placeholder="텍스트 입력" />
        <label><input type="checkbox" v-model="useBold" /> Bold</label>
        <label><input type="checkbox" v-model="useItalic" /> Italic</label>
        <label><input type="checkbox" v-model="useEmoji" /> Emoji</label>
      </div>
      <div class="preview">
        <button class="app-btn windows" @click="onDecorate">Decorate</button>
        <p class="message">{{ decorated }}</p>
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
import { TextContext, UpperCaseFormatter, LowerCaseFormatter, TitleCaseFormatter } from './strategy/TextStrategy';
import { HtmlReportBuilder, MarkdownReportBuilder, ReportDirector } from './builder/ReportBuilder';
import { BoldDecorator, EmojiDecorator, ItalicDecorator, PlainText } from './decorator/TextDecorator';

// Builder state
type BuilderKind = 'md' | 'html';
const builderSelected = ref<BuilderKind>('md');
const builderTitle = ref('My Report');
const builtReport = ref('');
function onBuild() {
  const builder = builderSelected.value === 'md' ? new MarkdownReportBuilder() : new HtmlReportBuilder();
  const director = new ReportDirector(builder);
  builtReport.value = director.constructQuickStart(builderTitle.value || 'Untitled');
}

// Decorator state
const decoratorInput = ref('decorate me');
const useBold = ref(true);
const useItalic = ref(false);
const useEmoji = ref(true);
const decorated = ref('');
function onDecorate() {
  let component = new PlainText(decoratorInput.value || '');
  if (useBold.value) component = new BoldDecorator(component);
  if (useItalic.value) component = new ItalicDecorator(component);
  if (useEmoji.value) component = new EmojiDecorator(component, '✨');
  decorated.value = component.render();
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
.code-block { background: #0b1220; color: #e5e7eb; padding: 0.75rem; border-radius: 8px; white-space: pre-wrap; }
.text { padding: 0.5rem 0.6rem; border: 1px solid #e5e7eb; border-radius: 6px; }
code {
  background: #f3f4f6;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
}
</style>
