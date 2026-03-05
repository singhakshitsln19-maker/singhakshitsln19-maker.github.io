
(function () {

  const NEW_TOOLS_2 = [
    ['body_temp',    'health',  '🌡️', 'Body Temperature',    'Convert and assess body temperature'],
    ['grade_calc',   'util',    '📊', 'Grade Calculator',    'Calculate GPA and letter grade'],
    ['tip_split',    'finance', '💳', 'Smart Tip Splitter',  'Tip calculator with custom splits'],
    ['word_cloud',   'text',    ☁️', 'Word Cloud',          'Top words as frequency cloud'],
    ['dice_stats',   'random',  '📈', 'Dice Probability',   'Probability of dice outcomes'],
    ['hex_editor',   'dev',     '🔧', 'Hex Viewer',         'View text as hex dump'],
    ['jwt_decode',   'dev',     '🪙', 'JWT Decoder',        'Decode JSON Web Tokens'],
    ['color_blind2', 'color',   '👁️', 'Color Safe Pairs',   'WCAG accessible color combos'],
    ['css_unit',     'convert', '📐', 'CSS Units Converter', 'px em rem vw vh converter'],
    ['birth_stone',  'fun',     '💎', 'Birthstone Finder',  'Find your birthstone by month'],
    ['loan_vs',      'finance', '⚖️', 'Loan Comparator',    'Compare two loan options'],
    ['ip_class',     'dev',     '🌐', 'IP Classifier',      'Classify IP address type/class'],
    ['word_rhyme',   'text',    '🎵', 'Rhyme Finder',       'Find rhyming word endings'],
    ['time_zone_map','date',    '🗺️', 'Timezone Map',       'All major timezone offsets'],
    ['font_preview', 'util',    '🔤', 'Font Previewer',     'Preview text in different fonts'],
    ['calorie_burn', 'health',  '🏃', 'Activity Calories',  'Calories burned by activity'],
    ['sudoku_check', 'util',    '🔢', 'Sudoku Validator',   'Check if a sudoku grid is valid'],
    ['color_name2',  'color',   '🏷️', 'HEX to Color Name',  'Get nearest named color'],
    ['bmi_chart',    'health',  '📊', 'BMI Chart',          'Full BMI category reference'],
    ['text_diff2',   'text',    '🔍', 'Word Diff',          'Compare texts word by word'],
  ];

  // Inject into TR
  if (typeof TR !== 'undefined' && Array.isArray(TR)) {
    NEW_TOOLS_2.forEach(t => { if (!TR.find(x => x[0] === t[0])) TR.push(t); });
    if (typeof renderTools === 'function') {
      document.getElementById('st1').textContent = TR.length;
      document.getElementById('hcount').textContent = TR.length;
      renderTools();
    }
  }

  // Wrap buildUI
  const _prev = typeof buildUI === 'function' ? buildUI : () => null;
  window.buildUI = function (id) {
    const e = _prev(id);
    if (e) return e;

    const I  = (l,id,ph,tp='text') => `<label class="fl">${l}</label><input class="mi" id="${id}" placeholder="${ph}" type="${tp}">`;
    const TA = (l,id,ph,h=90)      => `<label class="fl">${l}</label><textarea class="mi" id="${id}" placeholder="${ph}" style="min-height:${h}px"></textarea>`;
    const SL = (l,id,opts)         => `<label class="fl">${l}</label><select class="mi" id="${id}">${opts.map(([v,t])=>`<option value="${v}">${t}</option>`).join('')}</select>`;
    const BT = (l,fn)              => `<button class="mbt" onclick="${fn}">${l}</button>`;

    const ui = {

      // 1. BODY TEMPERATURE
      body_temp:
        I('Temperature value', 'bt_val', '98.6', 'number') +
        SL('Unit', 'bt_unit', [['f','Fahrenheit °F'],['c','Celsius °C']]) +
        BT('ASSESS TEMPERATURE', 'bodyTemp()'),

      // 2. GRADE CALCULATOR
      grade_calc:
        TA('Enter grades (one per line, e.g. 85 or A)', 'gc_grades', '95\n88\nB\n72\nA+', 100) +
        BT('CALCULATE GPA', 'gradeCalc()'),

      // 3. SMART TIP SPLITTER
      tip_split:
        I('Total bill ($)', 'ts_bill', '150', 'number') +
        I('Tip %', 'ts_tip', '18', 'number') +
        `<label class="fl">CUSTOM SPLIT (names & %)</label>` +
        TA('Name:percent per line', 'ts_splits', 'Alice:40\nBob:35\nCarol:25', 70) +
        BT('CALCULATE SMART SPLIT', 'smartTipSplit()'),

      // 4. WORD CLOUD
      word_cloud:
        TA('Paste text', 'wc2_t', 'Paste a paragraph or article...', 110) +
        I('Top N words', 'wc2_n', '15', 'number') +
        BT('GENERATE WORD CLOUD', 'wordCloud()'),

      // 5. DICE PROBABILITY
      dice_stats:
        SL('Dice type', 'ds_type', [['6','D6'],['4','D4'],['8','D8'],['10','D10'],['12','D12'],['20','D20']]) +
        I('Number of dice', 'ds_n', '2', 'number') +
        I('Target sum', 'ds_target', '7', 'number') +
        BT('CALCULATE PROBABILITY', 'diceStats()'),

      // 6. HEX VIEWER
      hex_editor:
        TA('Text input', 'hx_t', 'Enter any text to view as hex dump...', 80) +
        BT('VIEW HEX DUMP', 'hexViewer()'),

      // 7. JWT DECODER
      jwt_decode:
        TA('Paste JWT token', 'jwt_t', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', 80) +
        BT('DECODE JWT', 'decodeJWT()'),

      // 8. COLOR SAFE PAIRS
      color_blind2:
        I('Base color hex', 'cs2_c', '#0066cc') +
        BT('SHOW ACCESSIBLE PAIRS', 'colorSafePairs()'),

      // 9. CSS UNIT CONVERTER
      css_unit:
        I('Value', 'cu_v', '16', 'number') +
        SL('From unit', 'cu_from', [['px','px'],['em','em'],['rem','rem'],['pt','pt'],['vw','vw (viewport)'],['vh','vh (viewport)'],['cm','cm'],['mm','mm']]) +
        I('Base font size (px)', 'cu_base', '16', 'number') +
        I('Viewport width (px)', 'cu_vp', '1440', 'number') +
        BT('CONVERT ALL UNITS', 'cssUnitConv()'),

      // 10. BIRTHSTONE FINDER
      birth_stone:
        SL('Birth month', 'bs_month', [
          ['1','January'],['2','February'],['3','March'],['4','April'],
          ['5','May'],['6','June'],['7','July'],['8','August'],
          ['9','September'],['10','October'],['11','November'],['12','December'],
        ]) +
        BT('FIND BIRTHSTONE', 'birthstone()'),

      // 11. LOAN COMPARATOR
      loan_vs:
        `<div style="font-size:.6rem;color:#00aa22;letter-spacing:2px;margin-bottom:8px">LOAN A</div>` +
        I('Amount ($)', 'lva_amt', '100000', 'number') +
        I('Rate (%)', 'lva_rate', '8', 'number') +
        I('Months', 'lva_mo', '60', 'number') +
        `<div style="font-size:.6rem;color:#a855f7;letter-spacing:2px;margin:8px 0">LOAN B</div>` +
        I('Amount ($)', 'lvb_amt', '100000', 'number') +
        I('Rate (%)', 'lvb_rate', '6', 'number') +
        I('Months', 'lvb_mo', '84', 'number') +
        BT('COMPARE LOANS', 'loanComparator()'),

      // 12. IP CLASSIFIER
      ip_class:
        I('IP Address', 'ipc_v', '192.168.1.1') +
        BT('CLASSIFY IP', 'ipClassifier()'),

      // 13. WORD RHYME
      word_rhyme:
        I('Enter a word', 'wr_t', 'moon') +
        BT('FIND RHYMES', 'findRhymes()'),

      // 14. TIMEZONE MAP
      time_zone_map:
        BT('SHOW ALL TIMEZONES', 'timezoneMap()'),

      // 15. FONT PREVIEWER
      font_preview:
        I('Preview text', 'fp_t', 'The quick brown fox jumps') +
        I('Font size (px)', 'fp_size', '20', 'number') +
        SL('Font', 'fp_font', [
          ['Georgia,serif','Georgia (Serif)'],
          ['Arial,sans-serif','Arial (Sans)'],
          ["'Courier New',monospace",'Courier New (Mono)'],
          ['Verdana,sans-serif','Verdana'],
          ['Impact,sans-serif','Impact'],
          ['Tahoma,sans-serif','Tahoma'],
          ["'Times New Roman',serif",'Times New Roman'],
          ['Palatino,serif','Palatino'],
          ['Garamond,serif','Garamond'],
          ["'Comic Sans MS',cursive",'Comic Sans'],
        ]) +
        BT('PREVIEW FONT', 'fontPreview()'),

      // 16. ACTIVITY CALORIES BURNED
      calorie_burn:
        I('Your weight (kg)', 'cb2_w', '70', 'number') +
        I('Duration (minutes)', 'cb2_t', '30', 'number') +
        SL('Activity', 'cb2_act', [
          ['walk3','Walking (slow 3km/h)'],
          ['walk5','Walking (brisk 5km/h)'],
          ['run8','Running (8km/h)'],
          ['run12','Running (12km/h)'],
          ['cycle','Cycling (moderate)'],
          ['swim','Swimming (laps)'],
          ['yoga','Yoga'],
          ['hiit','HIIT Training'],
          ['jump','Jump Rope'],
          ['dance','Dancing'],
          ['weight','Weight Training'],
          ['climb','Stair Climbing'],
        ]) +
        BT('CALCULATE CALORIES BURNED', 'activityCalories()'),

      // 17. SUDOKU VALIDATOR
      sudoku_check:
        `<label class="fl">Enter 9×9 Sudoku (81 digits, use 0 for empty)</label>` +
        TA('Grid', 'sdk_t', '530070000\n600195000\n098000060\n800060003\n400803001\n700020006\n060000280\n000419005\n000080079', 150) +
        BT('VALIDATE SUDOKU', 'validateSudoku()'),

      // 18. HEX TO COLOR NAME
      color_name2:
        I('Hex color', 'cn2_c', '#3498db') +
        BT('GET COLOR NAME', 'hexToColorName()'),

      // 19. BMI CHART
      bmi_chart:
        BT('SHOW FULL BMI CHART', 'bmiChart()'),

      // 20. WORD DIFF
      text_diff2:
        TA('Original text', 'wd_a', 'The quick brown fox', 70) +
        TA('Modified text', 'wd_b', 'The slow brown cat', 70) +
        BT('WORD-BY-WORD DIFF', 'wordDiff()'),
    };

    return ui[id] || null;
  };

  // ═══════════════════════════════════════════════════════════════
  // FUNCTIONS
  // ═══════════════════════════════════════════════════════════════
  function so(txt) { const e = document.getElementById('out'); if(e){e.style.display='block';e.textContent=txt;} }
  function gv(id) { return (document.getElementById(id)||{}).value||''; }

  // 1. BODY TEMPERATURE
  window.bodyTemp = function() {
    const val = +gv('bt_val'), unit = gv('bt_unit');
    let c = unit === 'f' ? (val - 32) * 5/9 : val;
    let f = unit === 'c' ? val * 9/5 + 32 : val;
    let k = c + 273.15;
    let status = c < 35 ? '🥶 Hypothermia — seek medical help!' :
                 c < 36.1 ? '🌡️ Below normal (below 97°F)' :
                 c <= 37.2 ? '✅ Normal temperature' :
                 c <= 38 ? '⚠️ Low-grade fever' :
                 c <= 39.4 ? '🔥 Fever — rest and hydrate' :
                 c <= 41 ? '🚨 High fever — see a doctor!' :
                 '🆘 Hyperthermia — emergency!';
    so(`Celsius:    ${c.toFixed(2)} °C\nFahrenheit: ${f.toFixed(2)} °F\nKelvin:     ${k.toFixed(2)} K\n${'─'.repeat(32)}\nStatus: ${status}`);
  };

  // 2. GRADE CALCULATOR
  window.gradeCalc = function() {
    const lines = gv('gc_grades').split('\n').map(l=>l.trim()).filter(Boolean);
    const gradeMap = {'A+':4.3,'A':4.0,'A-':3.7,'B+':3.3,'B':3.0,'B-':2.7,'C+':2.3,'C':2.0,'C-':1.7,'D+':1.3,'D':1.0,'F':0};
    const letterMap = n => n>=97?'A+':n>=93?'A':n>=90?'A-':n>=87?'B+':n>=83?'B':n>=80?'B-':n>=77?'C+':n>=73?'C':n>=70?'C-':n>=67?'D+':n>=60?'D':'F';
    let total=0, count=0, details=[];
    lines.forEach(l => {
      const num = parseFloat(l);
      if (!isNaN(num) && num >= 0 && num <= 100) {
        const letter = letterMap(num);
        const gpa = gradeMap[letter] || 0;
        total += gpa; count++;
        details.push(`${String(num).padEnd(6)} → ${letter} (${gpa.toFixed(1)})`);
      } else if (gradeMap[l.toUpperCase()] !== undefined) {
        const gpa = gradeMap[l.toUpperCase()];
        total += gpa; count++;
        details.push(`${l.toUpperCase().padEnd(6)} → ${gpa.toFixed(1)}`);
      }
    });
    const gpa = count ? total / count : 0;
    so(details.join('\n') + `\n${'─'.repeat(28)}\nGPA: ${gpa.toFixed(2)} / 4.3\nGrade: ${gpa>=3.7?'A / Distinction':gpa>=3.0?'B / Merit':gpa>=2.0?'C / Pass':'D or below'}\nCourses: ${count}`);
  };

  // 3. SMART TIP SPLITTER
  window.smartTipSplit = function() {
    const bill = +gv('ts_bill'), tip = +gv('ts_tip');
    const splits = gv('ts_splits').split('\n').map(l=>l.trim()).filter(Boolean);
    const tipAmt = bill * tip / 100;
    const total = bill + tipAmt;
    if (!splits.length) { so(`Total: $${total.toFixed(2)}`); return; }
    let lines = [];
    splits.forEach(s => {
      const [name, pct] = s.split(':');
      const share = total * (+pct || 0) / 100;
      lines.push(`${(name||'?').padEnd(12)} ${pct||0}%  →  $${share.toFixed(2)}`);
    });
    so(`Bill: $${bill.toFixed(2)}  Tip: $${tipAmt.toFixed(2)}  Total: $${total.toFixed(2)}\n${'─'.repeat(35)}\n${lines.join('\n')}`);
  };

  // 4. WORD CLOUD
  window.wordCloud = function() {
    const t = gv('wc2_t').toLowerCase().replace(/[^a-z\s]/g,' ');
    const stop = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','is','it','this','that','was','are','be','as','by','from','have','has','not','but','we','you','they','he','she','i','my','your','his','her','its']);
    const words = t.split(/\s+/).filter(w=>w.length>2&&!stop.has(w));
    const freq = {};
    words.forEach(w=>{freq[w]=(freq[w]||0)+1;});
    const top = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,+gv('wc2_n')||15);
    const max = top[0]?.[1]||1;
    const cloud = top.map(([w,c])=>{
      const size = Math.max(1,Math.round((c/max)*5));
      return `${'█'.repeat(size)} ${w} (${c}×)`;
    }).join('\n');
    so(`TOP ${top.length} WORDS:\n${'─'.repeat(30)}\n${cloud}`);
  };

  // 5. DICE PROBABILITY
  window.diceStats = function() {
    const sides = +gv('ds_type'), n = +gv('ds_n'), target = +gv('ds_target');
    if(target < n || target > n*sides){so(`Target ${target} is impossible with ${n}d${sides} (range: ${n}–${n*sides})`);return;}
    // Count ways using DP
    let dp = Array(n*sides+1).fill(0);
    dp[0]=1;
    for(let i=0;i<n;i++){
      const ndp=Array(n*sides+1).fill(0);
      for(let s=0;s<dp.length;s++){
        if(!dp[s])continue;
        for(let f=1;f<=sides;f++){if(s+f<ndp.length)ndp[s+f]+=dp[s];}
      }
      dp=ndp;
    }
    const total=Math.pow(sides,n);
    const ways=dp[target]||0;
    const pct=(ways/total*100).toFixed(4);
    so(`${n}d${sides} → Target: ${target}\n${'─'.repeat(30)}\nWays to get ${target}: ${ways}\nTotal outcomes: ${total}\nProbability: ${pct}%\nOdds: 1 in ${(total/ways).toFixed(1)}\nMin: ${n}  Max: ${n*sides}  Mean: ${((n*(sides+1))/2).toFixed(1)}`);
  };

  // 6. HEX VIEWER
  window.hexViewer = function() {
    const t = gv('hx_t');
    const bytes = t.split('').map(c=>c.charCodeAt(0));
    let out='OFFSET  HEX                              ASCII\n'+'─'.repeat(52)+'\n';
    for(let i=0;i<bytes.length;i+=16){
      const chunk=bytes.slice(i,i+16);
      const hex=chunk.map(b=>b.toString(16).padStart(2,'0')).join(' ').padEnd(47);
      const asc=chunk.map(b=>b>=32&&b<127?String.fromCharCode(b):'.').join('');
      out+=`${i.toString(16).padStart(6,'0')}  ${hex}  ${asc}\n`;
    }
    so(out);
  };

  // 7. JWT DECODER
  window.decodeJWT = function() {
    const token = gv('jwt_t').trim();
    const parts = token.split('.');
    if(parts.length!==3){so('Invalid JWT: must have 3 parts');return;}
    try{
      const dec = s => JSON.stringify(JSON.parse(atob(s.replace(/-/g,'+').replace(/_/g,'/'))),null,2);
      const header = dec(parts[0]);
      const payload = dec(parts[1]);
      const now = Math.floor(Date.now()/1000);
      let expInfo='';
      try{
        const pl=JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/')));
        if(pl.exp){expInfo=`\nExpires: ${new Date(pl.exp*1000).toLocaleString()} ${pl.exp<now?'(EXPIRED ⚠️)':'(VALID ✅)'}`;}
      }catch{}
      so(`HEADER:\n${header}\n\nPAYLOAD:\n${payload}${expInfo}\n\nSIGNATURE: ${parts[2].slice(0,20)}...`);
    }catch(e){so('Failed to decode: '+e.message);}
  };

  // 8. COLOR SAFE PAIRS
  window.colorSafePairs = function() {
    const base = gv('cs2_c').replace('#','');
    const r=parseInt(base.slice(0,2),16),g=parseInt(base.slice(2,4),16),b=parseInt(base.slice(4,6),16);
    const lum = c => {const s=c/255;return s<=0.03928?s/12.92:Math.pow((s+0.055)/1.055,2.4);};
    const relLum = (r,g,b) => 0.2126*lum(r)+0.7152*lum(g)+0.0722*lum(b);
    const contrast = (l1,l2) => (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
    const baseLum = relLum(r,g,b);
    const pairs = [['#000000','Black'],['#FFFFFF','White'],['#333333','Dark Gray'],['#666666','Medium Gray'],['#FFFF00','Yellow'],['#FF0000','Red'],['#0000FF','Blue'],['#008000','Green']];
    const results = pairs.map(([hex,name])=>{
      const pr=parseInt(hex.slice(1,3),16),pg=parseInt(hex.slice(3,5),16),pb=parseInt(hex.slice(5,7),16);
      const ratio=contrast(baseLum,relLum(pr,pg,pb));
      const wcag=ratio>=7?'AAA':ratio>=4.5?'AA':ratio>=3?'AA Large':'FAIL';
      return `${name.padEnd(14)} ${ratio.toFixed(2).padEnd(6)} ${wcag}`;
    });
    so(`Base color: #${base}\n${'─'.repeat(36)}\nBackground      Ratio  WCAG\n${results.join('\n')}\n\nAA = 4.5:1 (normal text)\nAAA = 7:1 (enhanced)`);
  };

  // 9. CSS UNIT CONVERTER
  window.cssUnitConv = function() {
    const v=+gv('cu_v'),from=gv('cu_from'),base=+gv('cu_base')||16,vp=+gv('cu_vp')||1440;
    let px;
    if(from==='px')px=v;
    else if(from==='em'||from==='rem')px=v*base;
    else if(from==='pt')px=v*1.333;
    else if(from==='vw')px=v*vp/100;
    else if(from==='vh')px=v*(window.innerHeight||900)/100;
    else if(from==='cm')px=v*37.795;
    else if(from==='mm')px=v*3.7795;
    so(`Input: ${v}${from}\n${'─'.repeat(28)}\npx:   ${px.toFixed(3)}\nem:   ${(px/base).toFixed(4)}\nrem:  ${(px/base).toFixed(4)}\npt:   ${(px/1.333).toFixed(3)}\nvw:   ${(px/vp*100).toFixed(4)}  (at ${vp}px)\n%:    ${(px/base*100).toFixed(2)}%\ncm:   ${(px/37.795).toFixed(4)}\nmm:   ${(px/3.7795).toFixed(3)}`);
  };

  // 10. BIRTHSTONE
  window.birthstone = function() {
    const m=+gv('bs_month');
    const stones=[
      {month:'January',  stone:'Garnet',    color:'#9B1B30',desc:'Deep red, symbolizes friendship and trust'},
      {month:'February', stone:'Amethyst',   color:'#9966CC',desc:'Purple quartz, symbolizes peace and courage'},
      {month:'March',    stone:'Aquamarine', color:'#7FFFD4',desc:'Blue-green, symbolizes youth and hope'},
      {month:'April',    stone:'Diamond',    color:'#B9F2FF',desc:'Hardest gem, symbolizes strength and love'},
      {month:'May',      stone:'Emerald',    color:'#50C878',desc:'Green, symbolizes rebirth and good fortune'},
      {month:'June',     stone:'Pearl',      color:'#F0EAD6',desc:'Classic white, symbolizes purity and loyalty'},
      {month:'July',     stone:'Ruby',       color:'#E0115F',desc:'Fiery red, symbolizes passion and health'},
      {month:'August',   stone:'Peridot',    color:'#B4C424',desc:'Olive green, symbolizes strength and beauty'},
      {month:'September',stone:'Sapphire',   color:'#0F52BA',desc:'Blue, symbolizes wisdom and royalty'},
      {month:'October',  stone:'Opal',       color:'#A8C3BC',desc:'Multicolor, symbolizes creativity and hope'},
      {month:'November', stone:'Topaz',      color:'#FFC87C',desc:'Golden, symbolizes love and affection'},
      {month:'December', stone:'Turquoise',  color:'#40E0D0',desc:'Blue-green, symbolizes good luck and success'},
    ];
    const s=stones[m-1];
    if(!s){so('Select a valid month');return;}
    so(`Month:     ${s.month}\nBirthstone: ${s.stone}\nColor:     ${s.color}\n\n${s.desc}\n\nFun fact: ${s.stone} has been prized for centuries as a symbol of its wearer's birth month.`);
  };

  // 11. LOAN COMPARATOR
  window.loanComparator = function() {
    const emi=(p,r,n)=>{const mr=r/12/100;return mr?p*mr*Math.pow(1+mr,n)/(Math.pow(1+mr,n)-1):p/n;};
    const aEmi=emi(+gv('lva_amt'),+gv('lva_rate'),+gv('lva_mo'));
    const bEmi=emi(+gv('lvb_amt'),+gv('lvb_rate'),+gv('lvb_mo'));
    const aTotal=aEmi * +gv('lva_mo'), bTotal=bEmi * +gv('lvb_mo');
    const aInt=aTotal - +gv('lva_amt'), bInt=bTotal - +gv('lvb_amt');
    const winner = aTotal<bTotal?'A':'B';
    so(`LOAN A              LOAN B\n${'─'.repeat(36)}\nEMI:   $${aEmi.toFixed(0).padEnd(12)} $${bEmi.toFixed(0)}\nTotal: $${aTotal.toFixed(0).padEnd(12)} $${bTotal.toFixed(0)}\nInterest:$${aInt.toFixed(0).padEnd(11)} $${bInt.toFixed(0)}\n${'─'.repeat(36)}\nBetter deal: Loan ${winner}\nYou save:    $${Math.abs(aTotal-bTotal).toFixed(2)}`);
  };

  // 12. IP CLASSIFIER
  window.ipClassifier = function() {
    const ip=gv('ipc_v').trim();
    const parts=ip.split('.').map(Number);
    if(parts.length!==4||parts.some(p=>isNaN(p)||p<0||p>255)){so('Invalid IPv4 address');return;}
    const [a,b]=parts;
    let cls,range,type='Public';
    if(a===10||(a===172&&b>=16&&b<=31)||(a===192&
