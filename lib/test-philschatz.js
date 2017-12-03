'use babel';

import TestPhilschatzView from './test-philschatz-view';
import { CompositeDisposable } from 'atom';

export default {

  testPhilschatzView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testPhilschatzView = new TestPhilschatzView(state.testPhilschatzViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testPhilschatzView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test-philschatz:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testPhilschatzView.destroy();
  },

  serialize() {
    return {
      testPhilschatzViewState: this.testPhilschatzView.serialize()
    };
  },

  toggle() {
    console.log('TestPhilschatz was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
