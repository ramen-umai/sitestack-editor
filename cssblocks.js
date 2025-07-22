// <style> タグ全体
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