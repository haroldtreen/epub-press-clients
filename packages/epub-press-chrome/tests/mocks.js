import sinon from 'sinon';

export class MockChrome {
    constructor() {
        this.sandbox = sinon.createSandbox();
    }

    restore() {
        this.sandbox.restore();
    }

    get downloads() {
        return this;
    }

    get onChanged() {
        return this;
    }

    get runtime() {
        return this;
    }

    get lastError() {
        this.error = new Error('Chrome error');
        return this.error;
    }

    get download() {
        this.downloadStub = this.downloadStub || this.sandbox.stub();
        return this.downloadStub;
    }

    get addListener() {
        this.addListenerStub = this.addListenerStub || this.sandbox.stub();
        return this.addListenerStub;
    }
}

export default { MockChrome };
