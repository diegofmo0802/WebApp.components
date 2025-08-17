import { Component, Element } from '../WebApp/WebApp.js';

export class Button extends Component<'button', Button.eventMap> {
    protected root: Element<"button">;
    private eText: Element<'span'>;
    private eImage: Element<'img'>;
    public constructor(text: string, options: Button.options = {}) { super();
        this.root = Element.new('button', null, { class: 'Button' });
        this.eText = Element.new('span', text, { class: 'text' });
        this.eImage = Element.new('img', null, { class: 'image' });

        this.root.append(this.eText);

        this.root.on('click', () => this.emit('click'));
        this.root.on('mouseover', () => this.emit('hover'));

        this.setupOptions(options);
    }
    private setupOptions(options: Button.options) {
        if (options.image) this.image = options.image;
        if (options.id != null) this.root.id = options.id;
        if (options.class != null) {
            const classes = options.class.split(' ');
            this.root.classList.add(...classes);
        }
    }
    public get text(): string { return this.eText.text; }
    public set text(text: string) { this.eText.text = text; }
    public get image(): string { return this.eImage.root.src }
    public set image(value: string | null) {
        this.eImage.root.src = value || '';
        if (!value) this.eImage.remove();
        else this.eImage.appendTo(this.root);
    }
}
export namespace Button {
    export type eventMap = {
        click: () => void
        hover: () => void
    }
    export type options = {
        id?: string;
        class?: string;
        image?: string;
    }
}
export default Button;