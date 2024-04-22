export interface Subject {
    attach(observer: Observer): void;

    detach(observer: Observer): void;

    notify(): void;
}


export class Observable implements Subject {

    /**
     * @type {Observer[]} List of subscribers. In real life, the list of
     * subscribers can be stored more comprehensively (categorized by event
     * type, etc.).
     */
    private observers: Observer[] = [];


    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }

        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
    }

    public notify(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    public someBusinessLogic(): void {
        console.log('\nSubject: I\'m doing something important.');
        this.notify();
    }
}


export interface Observer {
    update(subject: Subject): void;
}

const ConcreteObserverA: Observer = {
    update: (subject: Subject) => {
        console.log(subject)       
    }
}

const ConcreteObserverB: Observer = {
    update: (subject: Subject) => {
        console.log(subject)       
    }
}

const subject = new Observable();

// const observer1 = new ConcreteObserverA();
subject.attach(ConcreteObserverA);

// const observer2 = new ConcreteObserverB();
subject.attach(ConcreteObserverB);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.detach(ConcreteObserverB);

subject.someBusinessLogic();