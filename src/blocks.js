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

const text_input = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput(""), "TEXT");
    this.setOutput(true, "String");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setColour('#ff8c1a');
  }
};
Blockly.common.defineBlocks({txt: text_input});

javascript.javascriptGenerator.forBlock['txt'] = function(block) {
  const text = block.getFieldValue('TEXT');
  return [`'${text}'`, Blockly.JavaScript.ORDER_ATOMIC];
};

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
              .appendField('テキスト')
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
              .appendField('クラス名')
              .appendField(new Blockly.FieldTextInput('クラス名'), 'CLASS')
              .appendField('の設定を適用させる');
          this.appendStatementInput('CONTENT')
              .setCheck(null); // ← セミコロン追加
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setTooltip('クラスのスタイルを適用させます'); // 修正
          this.setHelpUrl('');
          this.setStyle('html_blocks');
      }
  },
  html_id: {
      init: function() {
          this.appendDummyInput()
              .appendField('ID名')
              .appendField(new Blockly.FieldTextInput('ID名'), 'ID')
              .appendField('の設定を適用させる');
          this.appendStatementInput('CONTENT')
              .setCheck(null); // ← セミコロン追加
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setTooltip('ID専用のスタイルを適用させます'); // 修正
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
          .appendField('クラス名')
          .appendField(new Blockly.FieldTextInput('クラス名'), 'C')
          .appendField('の設定');
        this.appendStatementInput("ITEMS").setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('css_blocks');
        this.setTooltip("クラスの設定をします。");
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
            text: "ID名...の設定",
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
          .appendField('ID名')
          .appendField(new Blockly.FieldTextInput('ID名'), 'C')
          .appendField('の設定');
        this.appendStatementInput("ITEMS").setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('css_blocks');
        this.setTooltip("IDの設定をします。");
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
            text: "クラス名...の設定",
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

// --------------------
// CSSアニメーションブロック定義
// --------------------
const css_animation_block = {
  init: function() {
    this.appendDummyInput()
        .appendField("アニメーション")
        .appendField(new Blockly.FieldTextInput("box"), "SELECTOR")
        .appendField("種類")
        .appendField(new Blockly.FieldDropdown([
            ["フェードイン","fadeIn"],
            ["フェードアウト","fadeOut"],
            ["回転","rotate"],
            ["縮小","scaleDown"],
            ["拡大","scaleUp"],
            ["上に移動","moveUp"],
            ["下に移動","moveDown"],
            ["右に移動","moveRight"],
            ["左に移動","moveLeft"]
        ]), "ANIM_TYPE")
        .appendField("時間")
        .appendField(new Blockly.FieldNumber(2, 0, 10, 0.1), "DURATION")
        .appendField("秒 繰り返し")
        .appendField(new Blockly.FieldDropdown([["1回","1"], ["無限","infinite"]]), "REPEAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("指定した要素用のCSSアニメーションコードを出力します");
    this.setHelpUrl("");
    this.setStyle('css_blocks');
  }
};
Blockly.common.defineBlocks({css_animation_block: css_animation_block});

// --------------------
// JSコード生成（CSS文字列を出力）
// --------------------
javascript.javascriptGenerator.forBlock['css_animation_block'] = function(block) {
  const selector = block.getFieldValue('SELECTOR');
  const animType = block.getFieldValue('ANIM_TYPE');
  const duration = block.getFieldValue('DURATION');
  const repeat = block.getFieldValue('REPEAT');

  let keyframes = "";
  switch(animType){
    case "fadeIn": keyframes = "0% { opacity: 0; } 100% { opacity: 1; }"; break;
    case "fadeOut": keyframes = "0% { opacity: 1; } 100% { opacity: 0; }"; break;
    case "rotate": keyframes = "0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }"; break;
    case "scaleDown": keyframes = "0% { transform: scale(1); } 100% { transform: scale(0.5); }"; break;
    case "scaleUp": keyframes = "0% { transform: scale(1); } 100% { transform: scale(2); }"; break;
    case "moveUp": keyframes = "0% { transform: translateY(0); } 100% { transform: translateY(-200px); }"; break;
    case "moveDown": keyframes = "0% { transform: translateY(0); } 100% { transform: translateY(200px); }"; break;
    case "moveRight": keyframes = "0% { transform: translateX(0); } 100% { transform: translateX(200px); }"; break;
    case "moveLeft": keyframes = "0% { transform: translateX(0); } 100% { transform: translateX(-200px); }"; break;
  }

  return `/* CSSアニメーション */\n` +
         `.class-${selector} {\n  animation: ${animType} ${duration}s linear ${repeat};\n}\n` +
         `@keyframes ${animType} {\n  ${keyframes}\n}\n`;
};

const css_media = {
  init: function() {
    this.appendDummyInput('MENU')
      .appendField(new Blockly.FieldDropdown([
          ['スマホ', 'max-width: 480px'],
          ['タブレット(縦向き)', 'max-width: 768px'],
          ['タブレット(横向き)', 'max-width: 992px'],
          ['ノートPC', 'max-width: 1200px'],
          ['デスクトップPC', 'min-width: 1200px']
        ]), 'MENU')
      .appendField('の時のスタイルを');
    this.appendStatementInput('S'); // ← 内側にスタイルを書くブロック
    this.appendDummyInput('TXT')
      .appendField('にする');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('指定された機種の時に、指定したスタイルを適用します。');
    this.setStyle('css_blocks');
    this.setHelpUrl('');
  }
};
Blockly.common.defineBlocks({ css_media: css_media });

javascript.javascriptGenerator.forBlock['css_media'] = function(block, generator) {
  const condition = block.getFieldValue('MENU'); // 例: "max-width: 768px"
  const styles = generator.statementToCode(block, 'S'); // 中に書いたCSS
  const code = `@media (${condition}) {\n${styles}}\n`;
  return code;
};

const css_variables = {
  init: function() {
    this.appendDummyInput('MENU')
      .appendField('カラー定義');
    this.appendStatementInput('TXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('色や画像などを定義して使いまわします');
    this.setStyle('css_blocks');
    this.setHelpUrl('');
  }
};
Blockly.common.defineBlocks({css_variables: css_variables});
                    
javascript.javascriptGenerator.forBlock['css_variables'] = function(block, generator) {
  const styles = generator.statementToCode(block, 'TXT');
  const indented = styles.split('\n').map(line => line ? '  ' + line : line).join('\n');
  const code = `:root {\n${indented}\n}\n`;
  return code;
};

const css_variables_content = {
  init: function() {
    this.appendDummyInput('MENU')
      .appendField('定義項目名')
      .appendField(new Blockly.FieldTextInput('color'), 'NAME')
      .appendField('値')
      .appendField(new Blockly.FieldTextInput('#000000'), 'COL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('色や画像などを定義して使いまわします');
    this.setStyle('css_blocks');
    this.setHelpUrl('');
  }
};
Blockly.common.defineBlocks({css_variables_content: css_variables_content});
                    
javascript.javascriptGenerator.forBlock['css_variables_content'] = function(block) {
  const text_name = block.getFieldValue('NAME');
  const text_col = block.getFieldValue('COL');
  const code = `--${text_name}: ${text_col};\n`;
  return code;
}

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

// js_console
Blockly.common.defineBlocks({
  js_console: {
    init: function () {
      this.appendValueInput("TXT")
          .setCheck(null)
          .appendField("コンソールに"); // 横並びでフィールドを追加

      this.appendDummyInput()
          .appendField("を")
          .appendField(new Blockly.FieldDropdown([
            ["記録する", "log"],
            ["注意として記録する", "warn"],
            ["エラーとして記録する", "error"]
          ]), "METHOD");

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("js_blocks");
      this.setTooltip("コンソールにメッセージを表示します。");
    }
  }
});

javascript.javascriptGenerator.forBlock['js_console'] = function(block) {
  const value = javascript.javascriptGenerator.valueToCode(block, 'TXT', javascript.javascriptGenerator.ORDER_ATOMIC) || "''";
  const method = block.getFieldValue('METHOD');
  return `console.${method}(${value});\n`;
};
                    
    const text_to_speech = {
      init: function() {
        this.appendValueInput('RATE')
          .setCheck('Number')
          .appendField('速さ')
        this.appendValueInput('PITCH')
          .setCheck('Number')
          .appendField('声の高さ')
        this.appendValueInput('VOLUME')
          .setCheck('Number')
          .appendField('声の大きさ')
        this.appendDummyInput()
          .appendField('で')
        this.appendValueInput('TEXT')
          .setCheck('String')
        this.appendDummyInput()
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
      const rate = javascript.javascriptGenerator.valueToCode(
        block, 'RATE', Blockly.JavaScript.ORDER_ATOMIC);
      const pitch = javascript.javascriptGenerator.valueToCode(
        block,'PITCH', Blockly.JavaScript.ORDER_ATOMIC);
      const volume = javascript.javascriptGenerator.valueToCode(
        block,'VOLUME', Blockly.JavaScript.ORDER_ATOMIC);
      const text = javascript.javascriptGenerator.valueToCode(
        block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC) || "''";
      return `const utterance = new SpeechSynthesisUtterance(${text});\n` +
              `utterance.lang = 'ja-JP';\n` +
             `utterance.rate = ${rate};\n` +
             `utterance.pitch = ${pitch};\n` +
             `utterance.volume = ${volume};\n` +
             `speechSynthesis.speak(utterance);\n`;
    };

const js_alert = {
  init: function() {
    this.appendValueInput('TXT')
      .appendField('ダイアログ');
    this.appendDummyInput('DUMMY')
      .appendField('と表示する');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('警告ダイアログを表示します。');
    this.setStyle('js_blocks');
    this.setHelpUrl('');
  }
};
Blockly.common.defineBlocks({js_alert: js_alert});
                    
javascript.javascriptGenerator.forBlock['js_alert'] = function(block) {
  // 'TXT' は appendValueInput で指定した名前
  const value_txt = javascript.javascriptGenerator.valueToCode(
    block, 'TXT', Blockly.JavaScript.ORDER_ATOMIC
  ) || "''"; // 入力が無い場合は空文字
  return `alert(${value_txt});\n`;
};

const js_confirm = {
  init: function() {
    this.appendValueInput('TXT')
      .appendField('確認ダイアログ')
    this.appendDummyInput('DUMMY')
      .appendField('と表示する');
    this.setTooltip('確認ダイアログを表示します。');
    this.setOutput(true, 'Boolean'); // ← ここが値ブロックになるポイント
    this.setStyle('js_blocks');
    this.setHelpUrl('');
  }
};
Blockly.common.defineBlocks({js_confirm: js_confirm});
                    
javascript.javascriptGenerator.forBlock['js_confirm'] = function(block) {
  const value = javascript.javascriptGenerator.valueToCode(
    block, 'TXT', javascript.javascriptGenerator.ORDER_NONE
  ) || "''";
  return [`confirm(${value})`, javascript.javascriptGenerator.ORDER_FUNCTION_CALL];
};

const js_prompt = {
  init: function() {
    this.appendValueInput('TEXT')
      .appendField('入力ダイアログ')
    this.appendDummyInput('DUMMY')
      .appendField('と表示する');
    this.setTooltip('入力ダイアログを表示します。');
    this.setOutput(true, 'String'); // ← ここが値ブロックになるポイント
    this.setStyle('js_blocks');
    this.setHelpUrl('');
  }
};
Blockly.common.defineBlocks({js_prompt: js_prompt});

javascript.javascriptGenerator.forBlock['js_prompt'] = function(block) {
  const text = javascript.javascriptGenerator.valueToCode(
    block, 'TEXT', javascript.javascriptGenerator.ORDER_NONE
  ) || "''";
  // Blockly.JavaScript.ORDER_ATOMIC は安全に値として扱う順序
  return [`prompt(${text})`, Blockly.JavaScript.ORDER_ATOMIC];
};

const js_if = {
  init: function() {
    this.appendValueInput('TEXT')
      .setCheck('Boolean')
      .appendField('もし');
    this.appendDummyInput('NAME')
      .appendField('なら');
    this.appendStatementInput('BLOCK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('条件を満たしている場合は、処理を実行します');
    this.setStyle('js_blocks');
    this.setHelpUrl('');
  }
};
Blockly.common.defineBlocks({ js_if: js_if });

javascript.javascriptGenerator.forBlock['js_if'] = function(block, generator) {
  const value_text = generator.valueToCode(block, 'TEXT', javascript.Order.ATOMIC) || 'false';
  const statement_block = generator.statementToCode(block, 'BLOCK');
  const code = `if (${value_text}) {\n${statement_block}}\n`;
  return code;
};

const js_if_else = {
  init: function() {
    this.appendValueInput('TEXT')
    .setCheck('Boolean')
      .appendField('もし');
    this.appendDummyInput('NAME')
      .appendField('なら');
    this.appendStatementInput('BLOCK');
    this.appendDummyInput('TT')
      .appendField('でなければ');
    this.appendStatementInput('BB');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('条件を満たしている場合は、上の処理を実行し、満たしていない場合は、下の処理を実行します');
    this.setStyle('js_blocks');
    this.setHelpUrl('');
  }
};
Blockly.common.defineBlocks({js_if_else: js_if_else});
                    
javascript.javascriptGenerator.forBlock['js_if_else'] = function(block, generator) {
  // TODO: change Order.ATOMIC to the correct operator precedence strength
  const value_text = generator.valueToCode(block, 'TEXT', javascript.Order.ATOMIC);

  const statement_block = generator.statementToCode(block, 'BLOCK');

  const statement_bb = generator.statementToCode(block, 'BB');

  // TODO: Assemble javascript into the code variable.
  const code = `if (${value_text}) {\n${statement_block}}\n else {\n${statement_bb}}\n`;
  return code;
}

const js_for = {
  init: function() {
    this.appendValueInput('NUM')
    .setCheck('Number');
    this.appendDummyInput('TXT')
      .appendField('回繰り返す');
    this.appendStatementInput('S');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('指定された回数処理を実行します。');
    this.setStyle('js_blocks');
    this.setHelpUrl('');
  }
};
Blockly.common.defineBlocks({js_for: js_for});
                    
javascript.javascriptGenerator.forBlock['js_for'] = function(block, generator) {
  const value_num = generator.valueToCode(block, 'NUM', javascript.Order.ATOMIC);
  const statement_s = generator.statementToCode(block, 'S');
  const variable = generator.nameDB_.getDistinctName('i', Blockly.Names.NameType.VARIABLE);
  const code = `for (let ${variable} = 0; ${variable} < ${value_num}; ${variable}++) {\n${statement_s}}\n`;
  return code;
}

const js_math = {
  init: function() {
    this.appendValueInput('NUMO')
      .setCheck('Number');
    this.appendDummyInput('MENU')
      .appendField(new Blockly.FieldDropdown([
        ['+', '+'],
        ['-', '-'],
        ['×', '*'],
        ['÷', '/'],
        ['^', '**']
      ]), 'MENU');
    this.appendValueInput('NUMT')
      .setCheck('Number');
    this.setInputsInline(true);
    this.setOutput(true, 'Number'); // ← 出力ブロックに変更
    this.setTooltip('2つの数を演算します');
    this.setStyle('js_blocks'); // ← math系の見た目を指定
    this.setHelpUrl('');
  }
};
Blockly.common.defineBlocks({ js_math: js_math });

javascript.javascriptGenerator.forBlock['js_math'] = function(block, generator) {
  const value_numo = generator.valueToCode(block, 'NUMO', javascript.Order.NONE) || '0';
  const value_numt = generator.valueToCode(block, 'NUMT', javascript.Order.NONE) || '0';
  const operator = block.getFieldValue('MENU');

  let order;
  switch (operator) {
    case '+':
    case '-':
      order = javascript.Order.ADDITION;
      break;
    case '*':
    case '/':
      order = javascript.Order.MULTIPLICATION;
      break;
    case '**':
      order = javascript.Order.EXPONENTIATION;
      break;
    default:
      order = javascript.Order.NONE;
      break;
  }

  const code = `${value_numo} ${operator} ${value_numt}`;
  return [code, order];
};

Blockly.common.defineBlocks({
  js_define: {
    init: function() {
      this.jsonInit({
        message0: "定義 %1",
        args0: [
          {
            type: "field_input",
            name: "NAME",
            text: "myBlock"
          }
        ],
        message1: "%1",
        args1: [
          {
            type: "input_statement",
            name: "STACK"
          }
        ],
        style: "define_blocks",
        tooltip: "ブロックを定義します。",
        helpUrl: "",
        previousStatement: null,
        nextStatement: null
      });
    }
  }
});  

javascript.javascriptGenerator.forBlock['js_define'] = function(block) {
  const name = block.getFieldValue('NAME');
  const statements = javascript.javascriptGenerator.statementToCode(block, 'STACK');
  return `function ${name}() {\n${statements}}\n`;
}

Blockly.common.defineBlocks({
  js_define_return: {
    init: function() {
      this.jsonInit({
        message0: "戻り値 %1",
        args0: [
          {
            type: "field_input",
            name: "RETURN",
            text: "returnValue"
          }
        ],
        style: "define_blocks",
        tooltip: "戻り値を持つブロックを定義します。",
        helpUrl: "",
        previousStatement: null,
        nextStatement: null
      });
    }
  }
});
javascript.javascriptGenerator.forBlock['js_define_return'] = function(block) {
  const returnValue = block.getFieldValue('RETURN');
  return `return ${returnValue};\n`;
}

Blockly.Blocks['js_define_call'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("定義ブロック")
        .appendField(new Blockly.FieldTextInput("myBlock"), "NAME")
        .appendField("を使う");
    this.appendValueInput("VALUE")
        .setCheck(null)
        .appendField("引数");
    this.appendDummyInput("DUMMY");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('define_blocks');
    this.setTooltip("定義済みのブロックを呼び出します。");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['js_define_call'] = function(block) {
  const name = block.getFieldValue('NAME');
  const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || "''";
  return `${name}(${value});\n`;
};
