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

// html_blocks
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

// css_blocks
Blockly.common.defineBlocks({
    style: {
      init: function() {
        this.appendDummyInput().appendField("見た目");
        this.appendStatementInput("ITEMS").setCheck(null);
        this.setStyle('css_blocks');
        this.setTooltip("見た目の設定をします。");
        this.setHelpUrl("https://udemy.benesse.co.jp/design/web-design/what-is-css.html");
      }
    }
  });
  
  javascript.javascriptGenerator.forBlock['style'] = function(block) {
    const items = javascript.javascriptGenerator.statementToCode(block, 'ITEMS');
    return `<style>\n${items}</style>\n`;
  };
  
  // body用
  Blockly.common.defineBlocks({
    body_style: {
      init: function() {
        this.appendDummyInput().appendField("サイト全体");
        this.appendStatementInput("ITEMS").setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('css_blocks');
        this.setTooltip("サイト全体の設定をします。");
        this.setHelpUrl("https://udemy.benesse.co.jp/design/web-design/what-is-css.html");
      }
    }
  });
  
  javascript.javascriptGenerator.forBlock['body_style'] = function(block) {
    const items = javascript.javascriptGenerator.statementToCode(block, 'ITEMS');
    return `body {\n${items}}\n`;
  };
  
  // class
  Blockly.common.defineBlocks({
    class_style: {
      init: function() {
        this.appendDummyInput('GS')
          .appendField('キー名')
          .appendField(new Blockly.FieldTextInput('キーの名前'), 'C')
          .appendField('の設定');
        this.appendStatementInput("ITEMS").setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('css_blocks');
        this.setTooltip("キーの設定をします。");
        this.setHelpUrl("https://udemy.benesse.co.jp/design/web-design/what-is-css.html");
      },
      customContextMenu: function(options) {
        let block = this;
          options.push({
            text: '─────────────',
            enabled: false,
            callback: null
          });
          options.push({
            text: "スペシャルキー名...の設定",
            enabled: true,
            callback: function() {
              replaceBlock(block, 'id_style');
            }
        });
      }
    }
  });
  
  javascript.javascriptGenerator.forBlock['class_style'] = function(block) {
    const className = encodeURIComponent(block.getFieldValue('C').trim());
    const items = javascript.javascriptGenerator.statementToCode(block, 'ITEMS');
    return `.class-${className} {\n${items}}\n`;
  };

  // id
  Blockly.common.defineBlocks({
    id_style: {
      init: function() {
        this.appendDummyInput('GS')
          .appendField('スペシャルキー名')
          .appendField(new Blockly.FieldTextInput('キー名'), 'C')
          .appendField('の設定');
        this.appendStatementInput("ITEMS").setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('css_blocks');
        this.setTooltip("スペシャルキーの設定をします。");
        this.setHelpUrl("https://udemy.benesse.co.jp/design/web-design/what-is-css.html");
      },
      customContextMenu: function(options) {
        let block = this;
          options.push({
            text: '─────────────',
            enabled: false,
            callback: null
          });
          options.push({
            text: "キー名...の設定",
            enabled: true,
            callback: function() {
              replaceBlock(block, 'class_style');
            }
        });
      }
    }
  });
  
  javascript.javascriptGenerator.forBlock['id_style'] = function(block) {
    const idName = encodeURIComponent(block.getFieldValue('C').trim());
    const items = javascript.javascriptGenerator.statementToCode(block, 'ITEMS');
    return `#id-${idName} {\n${items}}\n`;
  };

  // 文字の色を設定するブロック
  Blockly.common.defineBlocks({
    color: {
      init: function() {
        this.appendDummyInput('COLOR')
          .appendField('文字の色を')
          .appendField(new Blockly.FieldTextInput('#000000'), 'C')
          .appendField('にする');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('文字の色を変更します。');
        this.setHelpUrl('https://www.tagindex.com/stylesheet/text_font/color.html');
        this.setStyle('css_blocks');
      }
    }
  });
  
  javascript.javascriptGenerator.forBlock['color'] = function(block) {
    const colour_c = block.getFieldValue('C');
    return `color: ${colour_c};\n`;
  };
  
  Blockly.common.defineBlocks({
    fontsize: {
      init: function() {
        this.appendDummyInput('SIZE')
          .appendField('文字の大きさを')
          .appendField(new Blockly.FieldTextInput('15'), 'S')
          .appendField('にする');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('文字の大きさを変更します。');
        this.setHelpUrl('https://www.tagindex.com/stylesheet/text_font/color.html');
        this.setStyle('css_blocks');
      }
    }
  });
  
  javascript.javascriptGenerator.forBlock['fontsize'] = function(block) {
    const size = block.getFieldValue('S');
    return `font-size: ${size}px;\n`;
  };

  const bold = {
    init: function() {
      this.appendDummyInput('NAME')
        .appendField('文字をを太字にする');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('');
      this.setHelpUrl('');
      this.setStyle('css_blocks');
    }
  };
  Blockly.common.defineBlocks({bold: bold});
                    
    javascript.javascriptGenerator.forBlock['bold'] = function() {
        return 'font-weight: bold;\n';
    };

    const radius = {
        init: function() {
          this.appendDummyInput('NAME')
            .appendField('丸みの効果を')
            .appendField(new Blockly.FieldTextInput('15'), 'S')
            .appendField('にする');
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setTooltip('');
          this.setHelpUrl('');
          this.setStyle('css_blocks');
        }
      };
      Blockly.common.defineBlocks({radius: radius});

      javascript.javascriptGenerator.forBlock['radius'] = function(block) {
        const size = block.getFieldValue('S');
        return `border-radius: ${size}px;\n`;
      };

// js_blocks
Blockly.common.defineBlocks({
    js_script: {
      init: function () {
        this.jsonInit({
          type: "js_script",
          message0: "機能",
          message1: " %1 ",
          args1: [
            {
              type: "input_statement",
              name: "CODE"
            }
          ],
          style: "js_blocks",
          tooltip: "機能を適用させます",
          helpUrl: ""
        });
      }
    }
  });
  javascript.javascriptGenerator.forBlock['js_script'] = function (block) {
    const statements = javascript.javascriptGenerator.statementToCode(block, 'CODE');
    return `<script>\n${statements}</script>\n`;
  };

  Blockly.common.defineBlocks({
    js_button_event: { // ← ブロック名を統一！
      init: function () {
        this.jsonInit({
          type: "js_button_event",
          message0: "名前が %1 のボタンが押されたとき",
          args0: [
            {
              type: "field_input",
              name: "KEY",
              text: "btn"
            }
          ],
          message1: "%1",
          args1: [
            {
              type: "input_statement",
              name: "DO"
            }
          ],
          style: "js_blocks",
          tooltip: "指定したキーのボタンが押されたときに処理を実行します",
          helpUrl: "btn",
          previousStatement: null,
          nextStatement: null
        });
  
        this.setOnChange(function(event) {
          if (!this.workspace) return;
        
          const keyValue = this.getFieldValue('KEY');
          const htmlButtons = this.workspace.getAllBlocks(false).filter(b => b.type === 'html_button');
        
          // KEY と同じ NAME を持つhtml_buttonがあるかチェック
          const matchExists = htmlButtons.some(btn => btn.getFieldValue('NAME') === keyValue);
        
          if (!matchExists) {
            this.setWarningText(`このブロックの入力欄の値(${keyValue})と同じ名前のボタンが必要です`);
          } else {
            this.setWarningText(null);
          }
        });        
      }
    }
  });  
  
    javascript.javascriptGenerator.forBlock['js_button_event'] = function (block) {
      const key = block.getFieldValue('KEY').trim();
      const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    
      if (!key) return ''; // キーが空なら何も出力しない
    
      return `document.getElementById("${key}").addEventListener("click", function() {\n${statements}});\n`;
    };

    Blockly.common.defineBlocks({
      js_console: {
        init: function () {
          this.appendDummyInput()
              .appendField("メッセージ")
              .appendField(new Blockly.FieldTextInput("内容"), "TXT")
              .appendField("をコンソールに")
              .appendField(new Blockly.FieldDropdown([
                ["記録する", "log"],
                ["注意として記録する", "warn"],
                ["エラーとして記録をする", "error"]
              ]), "METHOD");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setStyle('js_blocks');
          this.setTooltip("コンソールにメッセージを表示します。記録/注意/エラー の3種類があります。");
          this.setHelpUrl("https://developer.mozilla.org/ja/docs/Web/API/console");
        }
      }
    });

    javascript.javascriptGenerator.forBlock['js_console'] = function(block, generator) {
      const method = block.getFieldValue('METHOD');
      const value = block.getFieldValue('TXT');
      return `console.${method}('${value}');\n`;
    };

    const text_to_speech = {
      init: function() {
        this.appendDummyInput('TEXT')
          .appendField('速さ')
          .appendField(new Blockly.FieldNumber(1, 0.5, 2), 'RATE')
          .appendField('声の高さ')
          .appendField(new Blockly.FieldNumber(1, 0, 2), 'PITCH')
          .appendField('声の大きさ')
          .appendField(new Blockly.FieldNumber(1, 0, 1), 'VOLUME')
          .appendField('で')
          .appendField(new Blockly.FieldTextInput('こんにちは'), 'txt')
          .appendField('と話す');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('合成音声を使用し、話します');
        this.setHelpUrl('');
        this.setStyle('js_blocks');
      }
    };
    Blockly.common.defineBlocks({text_to_speech: text_to_speech});
                    
    javascript.javascriptGenerator.forBlock['text_to_speech'] = function(block) {
      const rate = block.getFieldValue('RATE');
      const pitch = block.getFieldValue('PITCH');
      const volume = block.getFieldValue('VOLUME');
      const text = block.getFieldValue('txt');
      return `const utterance = new SpeechSynthesisUtterance('${text}');\n` +
              `utterance.lang = 'ja-JP';\n` +
             `utterance.rate = ${rate};\n` +
             `utterance.pitch = ${pitch};\n` +
             `utterance.volume = ${volume};\n` +
             `speechSynthesis.speak(utterance);\n`;
    };