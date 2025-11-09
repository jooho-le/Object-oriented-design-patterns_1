import type { Button } from './Product';

export abstract class Dialog {
  // Factory Method: subclasses override this to create concrete products
  public abstract createButton(): Button;

  // Some business logic that relies on Product interface
  public render(): { label: string; messageOnClick: string } {
    const button = this.createButton();
    return {
      label: button.renderLabel(),
      messageOnClick: button.onClick(),
    };
  }
}

