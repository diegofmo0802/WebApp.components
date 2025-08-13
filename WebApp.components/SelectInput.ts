import { Element, Component } from '../WebApp/WebApp.js';

export class SelectInput<options extends string[] = string[]> extends Component<'select', SelectInput.EventMap<options>> {
    protected component: Element<"select">;
    protected placeholder: string;
    public constructor(options: options, placeholder: string = 'select') { super();
        this.placeholder = placeholder;

        this.component = Element.new('select').setAttributes({
            name: 'select',
            class: 'selectInput'
        }).append(
            Element.new('option', this.placeholder),
            ...options.map(option => Element.new('option', option))
        );

        this.component.on('change', () => this.emit('submit', this.getSelected()));
    }
    public getSelected(): options[number] {
        if (this.component.HTMLElement.value == this.placeholder) return '';
        return this.component.HTMLElement.value;
    }
    public setSelected(option: options[number]) {
        this.component.HTMLElement.value = option;
    }
}

export namespace SelectInput {
    export type Listener<options extends string[] = string[]> = (selected: options[number]) => void;
    export type EventMap<options extends string[] = string[]> = {
        submit: Listener<options>;
    }
}

export default SelectInput;