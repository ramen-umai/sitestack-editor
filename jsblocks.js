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
              .appendField("メッセージを")
              .appendField(new Blockly.FieldDropdown([
                ["記録する", "log"],
                ["注意として記録する", "warn"],
                ["エラーとして記録をする", "error"]
              ]), "METHOD")
              .appendField(new Blockly.FieldTextInput("内容"), "TXT");
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
    