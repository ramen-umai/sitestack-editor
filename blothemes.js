const ZelosDark = Blockly.Theme.defineTheme('ZelosDark', {
    base: Blockly.Themes.Zelos,
    
    blockStyles: {
      logic_blocks: {
        colourPrimary: '#1F4E79',
        colourSecondary: '#1A3E66',
        colourTertiary: '#2C6DA3',
      },
      loop_blocks: {
        colourPrimary: '#50e3c2',
        colourSecondary: '#3bbda3',
        colourTertiary: '#2c927f',
      },
      // 必要に応じて他のブロック種類も追加できる
    },
    
    categoryStyles: {
      // カテゴリの色設定（ブロックのグループ）
      logic_category: {
        colour: '#4a90e2',
      },
      loop_category: {
        colour: '#50e3c2',
      },
    },
    
    componentStyles: {
      // Blocklyエディタの背景やツールボックスなどの色
      workspaceBackgroundColour: '#1e1e1e',
      toolboxBackgroundColour: '#2e2e2e',
      toolboxForegroundColour: '#ffffff',
      flyoutBackgroundColour: '#d0d0d0',
      flyoutForegroundColour: '#000000',
      scrollbarColour: '#c0c0c0',
      insertionMarkerColour: '#0000ff',
      insertionMarkerOpacity: 1.5,
      markerColour: '#ff0000',
      cursorColour: '#000000',
      blackBackground: false,
    },
  });  

  const stackLight = Blockly.Theme.defineTheme('stackLight', {
    base: Blockly.Themes.Zelos,
    blockStyles: {
      html_blocks: {
        colourPrimary: '#dd4a24',
        colourSecondary: '#6b2213',
      },
      css_blocks: {
        colourPrimary: '#5ba58c',
        colourSecondary: '#121c1c',
      },
      js_blocks: {
        colourPrimary: '#d39c41',
        colourSecondary: '#4e3c17',
      },
    },
    categoryStyles: {
      html_category: {
        colour: '#dd4a24',
      },
      css_category: {
        colour: '#5ba58c',
      },
      js_category: {
        colour: '#d39c41',
      }
    },
    componentStyles: {
      workspaceBackgroundColour: '#f0f0f0',
      toolboxBackgroundColour: '#ffffff',
      toolboxForegroundColour: '#000000',
    }
  });
  
  const stackDark = Blockly.Theme.defineTheme('stackDark', {
    base: Blockly.Themes.ZelosDark,
    blockStyles: {
      html_blocks: {
        colourPrimary: '#2c0f07',
        colourSecondary: '#6b2213',
        colourTertiary: '#dd4a24',
      },
      css_blocks: {
        colourPrimary: '#121c1c',
        colourSecondary: '#5ba58c',
        colourTertiary: '#5ba58c',
      },
      js_blocks: {
        colourPrimary: '#2a200d',
        colourSecondary: '#eac97b',
        colourTertiary: '#eac97b',
      }
    },
    categoryStyles: {
      html_category: {
        colour: '#2c0f07',
      },
      css_category: {
        colour: '#121c1c',
      },
      js_category: {
        colour: '#2a200d',
      },
    },
    componentStyles: {
        // Blocklyエディタの背景やツールボックスなどの色
        workspaceBackgroundColour: '#1e1e1e',
        toolboxBackgroundColour: '#2e2e2e',
        toolboxForegroundColour: '#ffffff',
        flyoutBackgroundColour: '#d0d0d0',
        flyoutForegroundColour: '#000000',
        scrollbarColour: '#c0c0c0',
        insertionMarkerColour: '#3e3e3e',
        insertionMarkerOpacity: 1,
        markerColour: '#ff0000',
        cursorColour: '#000000',
        blackBackground: true,
    },
  });

const themes = {
    zelos: "Blockly.Themes.Zelos",
    classic: "Blockly.Themes.Classic",
    zelosDark: ZelosDark,
    stackDark: stackDark,
    stackLight: stackLight,
}