function replaceBlock(oldBlock, newBlockType) {
    const workspace = oldBlock.workspace;
  
    // 新しいブロックを作成
    const newBlock = workspace.newBlock(newBlockType);
    newBlock.initSvg();
    newBlock.render();
  
    // 古いブロックの位置に合わせる
    const xy = oldBlock.getRelativeToSurfaceXY();
    newBlock.moveBy(xy.x, xy.y);
  
    // 古いブロックを削除
    oldBlock.dispose(true);
  
    // 新しいブロックを選択状態に
    newBlock.select();
  }  

const html_h = {
    init: function() {
      this.appendDummyInput('H')
        .appendField(new Blockly.FieldDropdown([
            ['１', '1'],
            ['２', '2'],
            ['３', '3'],
            ['４', '4'],
            ['５', '5'],
            ['６', '6']
          ]), 'NUM')
        .appendField('番目の見出し')
        .appendField(new Blockly.FieldTextInput('テキスト'), 'TXT');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('文章(段落)を表示します');
      this.setHelpUrl('');
      this.setStyle('html_blocks');

    },
    customContextMenu: function(options) {
        let block = this;
          options.push({
            text: '─────────────',
            enabled: false,
            callback: null
          });
          options.push({
            text: "テキスト...",
            enabled: true,
            callback: function() {
              replaceBlock(block, 'html_p');
            }
        });
      }
  };
  Blockly.common.defineBlocks({html_h: html_h});
                      
  javascript.javascriptGenerator.forBlock['html_h'] = function(block) {
    const dropdown_num = block.getFieldValue('NUM');
    const text_txt = block.getFieldValue('TXT');

    const code = `<h${dropdown_num}>${text_txt}</h${dropdown_num}>\n`;
    return code;
  }
  
  Blockly.common.defineBlocks({
    html_p: {
      init: function() {
          this.appendDummyInput()
              .appendField('テキスト')
              .appendField(new Blockly.FieldTextInput('テキスト'), 'TXT');
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setTooltip('文章(段落)を表示します');
          this.setHelpUrl('');
          this.setStyle('html_blocks');
      },
      customContextMenu: function(options) {
          let block = this;
          options.push({
            text: '─────────────',
            enabled: false,
            callback: null
          });
          options.push({
            text: "...番目の見出し",
            enabled: true,
            callback: function() {
              replaceBlock(block, 'html_h');
            }
          });
      }
    }
  });
  
javascript.javascriptGenerator.forBlock['html_p'] = function(block) {
    const text_txt = block.getFieldValue('TXT');
    const code = `<p>${text_txt}</p>\n`;
    return code;
  }
Blockly.common.defineBlocks({
    html_a: {
        init: function() {
            this.appendDummyInput()
                .appendField('リンク')
                .appendField(new Blockly.FieldTextInput('リンクテキスト'), 'TEXT')
                .appendField('URL')
                .appendField(new Blockly.FieldTextInput('https://example.com'), 'URL');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip('リンクを作成します');
            this.setHelpUrl('');
            this.setStyle('html_blocks');
        }
    }
});
javascript.javascriptGenerator.forBlock['html_a'] = function(block) {
    const text_text = block.getFieldValue('TEXT');
    const text_url = block.getFieldValue('URL');
    const code = `<a href="${text_url}">${text_text}</a>\n`;
    return code;
}
Blockly.common.defineBlocks({
    html_img: {
        init: function() {
            this.appendDummyInput()
                .appendField('画像')
                .appendField(new Blockly.FieldTextInput('画像URL'), 'URL')
                .appendField('代替テキスト')
                .appendField(new Blockly.FieldTextInput('画像の説明'), 'ALT');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip('画像を表示します');
            this.setHelpUrl('');
            this.setStyle('html_blocks');
        }
    }
});
javascript.javascriptGenerator.forBlock['html_img'] = function(block) {
    const text_url = block.getFieldValue('URL');
    const text_alt = block.getFieldValue('ALT');
    const code = `<img src="${text_url}" alt="${text_alt}">\n`;
    return code;
}
Blockly.common.defineBlocks({
    html_ul: {
        init: function() {
            this.appendDummyInput()
                .appendField('順不同リスト');
            this.appendStatementInput('ITEMS')
                .setCheck(null)
                .appendField('項目');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip('順不同リストを作成します');
            this.setHelpUrl('');
            this.setStyle('html_blocks');
        },
        customContextMenu: function(options) {
          let block = this;
          options.push({
            text: '─────────────',
            enabled: false,
            callback: null
          });
          options.push({
            text: "番号付きリスト...",
            enabled: true,
            callback: function() {
              replaceBlock(block, 'html_ol');
            }
          });
      }
    },
    html_li: {
        init: function() {
            this.appendDummyInput()
            .appendField("リスト項目")
            .appendField(new Blockly.FieldTextInput("項目"), "TEXT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('html_blocks');
        this.setTooltip("リストの項目を1つ表示します。");
        this.setHelpUrl("https://developer.mozilla.org/ja/docs/Web/HTML/Element/li");
      },
      onchange: function(event) {
        // ワークスペースがなければスキップ
        if (!this.workspace) return;
    
        let parent = this.getParent();
        let valid = false;
    
        while (parent) {
          if (parent.type === 'html_ul' || parent.type === 'html_ol') {
            valid = true;
            break;
          }
          parent = parent.getParent();
        }
    
        if (!valid) {
          this.setWarningText('⚠ このブロックは番号付き、または順不同リストブロックの中に置いてください。');
        } else {
          this.setWarningText(null);
        }
      }
    },
    html_ol: {
        init: function() {
            this.appendDummyInput()
                .appendField('番号付きリスト');
            this.appendStatementInput('ITEMS')
                .setCheck(null)
                .appendField('項目');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip('番号付きリストを作成します');
            this.setHelpUrl('');
            this.setStyle('html_blocks');
        },
        customContextMenu: function(options) {
          let block = this;
          options.push({
            text: '─────────────',
            enabled: false,
            callback: null
          });
          options.push({
            text: "順不同リスト...",
            enabled: true,
            callback: function() {
              replaceBlock(block, 'html_ul');
            }
          });
      }
    }
});

javascript.javascriptGenerator.forBlock['html_ul'] = function(block) {
    const statements_items = javascript.javascriptGenerator.statementToCode(block, 'ITEMS');
    const code = `<ul>\n${statements_items}</ul>\n`;
    return code;
};

javascript.javascriptGenerator.forBlock['html_li'] = function(block) {
    const text_txt = block.getFieldValue('TEXT');
    const code = `<li>${text_txt}</li>\n`;
    return code;
};

javascript.javascriptGenerator.forBlock['html_ol'] = function(block) {
    const statements_items = javascript.javascriptGenerator.statementToCode(block, 'ITEMS');
    const code = `<ol>\n${statements_items}</ol>\n`;
    return code;
};

Blockly.common.defineBlocks({
    html_class: {
        init: function() {
            this.appendDummyInput()
                .appendField('キーが')
                .appendField(new Blockly.FieldTextInput('キー名'), 'CLASS')
                .appendField('の設定を適用させる');
            this.appendStatementInput('CONTENT')
                .setCheck(null); // ← セミコロン追加
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip('キーのスタイルを適用させます'); // 修正
            this.setHelpUrl('');
            this.setStyle('html_blocks');
        }
    },
    html_id: {
        init: function() {
            this.appendDummyInput()
                .appendField('スペシャルキーが')
                .appendField(new Blockly.FieldTextInput('スペシャルキー名'), 'ID')
                .appendField('の設定を適用させる');
            this.appendStatementInput('CONTENT')
                .setCheck(null); // ← セミコロン追加
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip('スペシャルキー専用のスタイルを適用させます'); // 修正
            this.setHelpUrl('');
            this.setStyle('html_blocks');
        }
    },
});

javascript.javascriptGenerator.forBlock['html_class'] = function(block) {
    const text_class = block.getFieldValue('CLASS');
    const statements_content = javascript.javascriptGenerator.statementToCode(block, 'CONTENT');
    const code = `<div class="class-${text_class}">\n${statements_content}</div>\n`;
    return code;
};

javascript.javascriptGenerator.forBlock['html_id'] = function(block) {
    const text_id = block.getFieldValue('ID');
    const statements_content = javascript.javascriptGenerator.statementToCode(block, 'CONTENT');
    const code = `<div id="id-${text_id}">\n${statements_content}</div>\n`;
    return code;
};

Blockly.common.defineBlocks({
    html_button: {
      init: function() {
        this.appendDummyInput()
            .appendField("ボタン")
            .appendField(new Blockly.FieldTextInput("ここをクリック"), "LABEL")
            .appendField('名前')
            .appendField(new Blockly.FieldTextInput("btn"), "NAME");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("ボタンを表示します");
        this.setHelpUrl("");
        this.setStyle('html_blocks'); // 必要ならスタイル指定
      }
    }
  });
  
  javascript.javascriptGenerator.forBlock['html_button'] = function(block) {
    const name = block.getFieldValue('NAME');
    const label = block.getFieldValue('LABEL');
    const code = `<button id="${name}">${label}</button>\n`;
    return code;
};