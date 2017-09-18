import { observable} from 'mobx';

class Storage {
    static itemName = 'phonebook';

    static set(value) {
        window.localStorage.setItem(Storage.itemName, JSON.stringify(value));
    }

    static get() {
        return JSON.parse(window.localStorage.getItem(Storage.itemName)) || [];
    }
}

class Phonebook {
    @observable phonebook;

    constructor() {
        this.phonebook = Storage.get();
        this.sortOrder = {phone: true, name: true, email: true};
    }

    addContact({phone, name, email}) {
        this.phonebook.push({
            phone,
            name,
            email,
            visible: true
        });
        Storage.set(this.phonebook);
    }

    removeContact(contact) {
        this.phonebook = this.phonebook.filter(c => c.phone !== contact.phone);
        Storage.set(this.phonebook);
    }

    clear() {
        this.phonebook = [];
        Storage.set(this.phonebook);
    }

    sortBy(field) {
        this.phonebook = this.phonebook.sort(
            (prev, cur) => this.sortOrder[field] ? prev[field] > cur[field] : prev[field] < cur[field]
        );
        this.sortOrder[field] = !this.sortOrder[field];
    }

    filter(q) {
        this.phonebook = this.phonebook.map(contact => {
            contact.visible = contact.phone.indexOf(q) !== -1
                || contact.name.indexOf(q) !== -1
                || contact.email.indexOf(q) !== -1;
            return contact;
        })
    }
}

export default new Phonebook();
export { Phonebook };
