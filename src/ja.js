/* eslint-disable */
;(function(root, factory) {
    if (typeof define === 'function' && define.amd) { // AMD
      define([], factory);
    } else if (typeof exports === 'object') { // Node.js
      module.exports = factory();
    } else { // Browser
      var messages = factory();
      for (var key in messages) {
        root.Blockly.Msg[key] = messages[key];
      }
    }
  }(this, function() {
  // This file was automatically generated.  Do not modify.
  
  'use strict';
  
  var Blockly = Blockly || { Msg: Object.create(null) };
  
  Blockly.Msg["ADD_COMMENT"] = "コメントを追加";
  Blockly.Msg["CHANGE_VALUE_TITLE"] = "値を変える：";
  Blockly.Msg["CLEAN_UP"] = "ブロックを整理する";
  Blockly.Msg["COLLAPSED_WARNINGS_WARNING"] = "つぶしたブロックには警告が入っています。";
  Blockly.Msg["COLLAPSE_ALL"] = "ブロックを折りたたむ";
  Blockly.Msg["COLLAPSE_BLOCK"] = "ブロックを折りたたむ";
  Blockly.Msg["DELETE_ALL_BLOCKS"] = "%1個あるすべてのブロックを削除しますか？";
  Blockly.Msg["DELETE_BLOCK"] = "ブロックを削除";
  Blockly.Msg["DELETE_VARIABLE"] = "変数 '%1' を削除";
  Blockly.Msg["DELETE_VARIABLE_CONFIRMATION"] = "%1か所で使われている変数 '%2' を削除しますか？";
  Blockly.Msg["DELETE_X_BLOCKS"] = "%1個のブロックを削除";
  Blockly.Msg["DIALOG_CANCEL"] = "キャンセル";
  Blockly.Msg["DIALOG_OK"] = "OK";
  Blockly.Msg["DISABLE_BLOCK"] = "ブロックを無効にする";
  Blockly.Msg["DUPLICATE_BLOCK"] = "複製";
  Blockly.Msg["DUPLICATE_COMMENT"] = "コメントを複製";
  Blockly.Msg["ENABLE_BLOCK"] = "ブロックを有効にする";
  Blockly.Msg["EXPAND_ALL"] = "ブロックを展開する";
  Blockly.Msg["EXPAND_BLOCK"] = "ブロックを展開する";
  Blockly.Msg["EXTERNAL_INPUTS"] = "外部入力";
  Blockly.Msg["HELP"] = "ヘルプ";
  Blockly.Msg["REDO"] = "やり直す";
  Blockly.Msg["REMOVE_COMMENT"] = "コメントを削除";
  Blockly.Msg["TODAY"] = "今日";
  Blockly.Msg["UNDO"] = "取り消す";
  return Blockly.Msg;
  }));
