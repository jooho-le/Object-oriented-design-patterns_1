import { Dialog } from './Creator';
import type { Button } from './Product';
import { HtmlButton, WindowsButton } from './ConcreteProducts';

export class WebDialog extends Dialog {
  public createButton(): Button {
    return new HtmlButton('Open Web Page');
  }
}

export class WindowsDialog extends Dialog {
  public createButton(): Button {
    return new WindowsButton('Open File');
  }
}

