'use babel';

import ReasonView from './reason-view';
import { CompositeDisposable } from 'atom';

export default {

  reasonView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.reasonView = new ReasonView(state.reasonViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.reasonView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'reason:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.reasonView.destroy();
  },

  serialize() {
    return {
      reasonViewState: this.reasonView.serialize()
    };
  },

  toggle() {
    console.log('Reason was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
