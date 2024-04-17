(d => {
  /** general initialization */
  let load = () => {
    // add event listener
    d.querySelector('button#start')?.addEventListener('click', start);
    d.querySelector('button#stop')?.addEventListener('click', stop);
    d.querySelector('button#init')?.addEventListener('click', init);

    d.querySelector('button#start')?.addEventListener('click', () => {
      gtag('event', 'click_start');
    });
    d.querySelector('button#stop')?.addEventListener('click', () => {
      gtag('event', 'click_stop');
    });
    d.querySelector('button#init')?.addEventListener('click', () => {
      gtag('event', 'click_init');
    });

    // append large file-size resource
    let parent = d.querySelector('head');
    let child = d.createElement('link');
    parent?.appendChild(child);
    child.rel = 'stylesheet';
    child.href = 'https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@500&display=swap';
  };


  /** mask set */
  let mask_set = () => {
    d.querySelector<HTMLElement>('aside#mask')!.dataset.state = 'visible';
  };

  /** mask unset */
  let mask_unset = () => {
    d.querySelector<HTMLElement>('aside#mask')!.dataset.state = 'hidden';
  };


  /** logger */
  enum logger{
    SUVIVOR,
    ALONE,
    BIRTH,
    DEAD,
    EXTINCT
  };

  let logging = (mode: number, id: string, name: string) => {
    let text: Text;
    let gen = d.querySelector<HTMLElement>('#generation')!.innerHTML;

    switch(mode){
      case logger.SUVIVOR:
        text = d.createTextNode('【決着】'+ name + ' 家が第 ' + gen + ' 世代で名字を統一しました');
      break;
      case logger.BIRTH:
        text = d.createTextNode('['+ gen + '] ' + name + ' さん出産を報告');
      break;
      case logger.EXTINCT:
        text = d.createTextNode('['+ gen + '] ' + name + ' 家が断絶');
      break;
      case logger.ALONE:
        //text = document.createTextNode('['+ gen + '] ' + name + ' 家で孤独死か');
      //break;
      case logger.DEAD:
        //text = document.createTextNode('['+ gen + '] ' + name + ' 家で死者発生');
      //break;
      default:
      return;
    }

    let node = d.createElement('dd');
    node.appendChild(text);
    node.dataset.id = id;
    node.dataset.mode = mode + '';

    d.querySelector<HTMLElement>('section#table dl')!.insertBefore(node, d.querySelector<HTMLElement>('section#table dl')!.firstChild);
  };


  /** onClick: button#start */
  let start = () => {
    mask_set();

    setTimeout(() => {
      // set state to playing/pause
      if(Array.from((new Map(Array.from(d.querySelectorAll('section#table ol li')).map(li=>[(li as HTMLElement).dataset.id,0])))).length < 2){
        let id = d.querySelector<HTMLElement>('section#table ol li')?.dataset.id + '';
        let name = d.querySelector<HTMLElement>('#table ul li[data-id="' + id + '"] span')?.innerHTML + '';

        logging(logger.SUVIVOR, id, name);

        if(!d.querySelectorAll('#table dl dd[data-mode="3"]').length){
          d.querySelectorAll('#table dl dd:not(:nth-of-type(-n+3))')
          .forEach(dd => {
            dd.innerHTML = dd.innerHTML.replace(' 家が断絶', '家');
          });
        }else{
          let cnt = 0;
          for(let i = 0, e = d.querySelectorAll('#table dl dd'), l = e.length; i < l; i ++){
            if(e[i] === Array.from(d.querySelectorAll('#table dl dd[data-mode="3"]')).pop()){
              break;
            }
            cnt ++;
          }
          d.querySelectorAll('#table dd:nth-of-type(n+' + (cnt + 3) + ')')
          .forEach(dd => {
            dd.innerHTML = dd.innerHTML.replace(' 家が断絶', '家');
          });
        }

        d.querySelector<HTMLElement>('main')!.dataset.state = 'pause';
        mask_unset();
        return;
      }else if(d.querySelector<HTMLElement>('main')!.dataset.state === 'pausing'){
        d.querySelector<HTMLElement>('main')!.dataset.state = 'pause';
        mask_unset();
        return;
      }else{
        d.querySelector<HTMLElement>('main')!.dataset.state = 'playing';
      }

      // if there are no marriable one, drop out one
      if(d.querySelectorAll('section#table ol li').length % 2 === 1){
        let id = d.querySelector<HTMLElement>('section#table ol li:last-of-type')?.dataset.id + '';
        let name = d.querySelector<HTMLElement>('#table ul li[data-id="' + id + '"] span')?.innerHTML + '';

        logging(logger.ALONE, id, name);

        let cnt = d.querySelector<HTMLElement>('section#table ol')!.getElementsByTagName('li').length - 1;
        d.querySelector<HTMLElement>('section#table ol')!.removeChild(
          d.querySelector<HTMLElement>('section#table ol')!.getElementsByTagName('li')[cnt]
        );
      }

      // even marry odd
      let nodes: Array<HTMLElement> = [];
      Array.from(d.querySelectorAll('section#table ol li'))
      .sort(() => ~~(Math.random() * 3) - 1)
      .forEach(node => {
        nodes.push(node as HTMLElement);
      });

      let children = [];
      let deadmen = [];

      for(let i = 0, l = nodes.length; i < l; i += 2){
        // decide family-name by random
        let id = '';
        let color = '';

        if(~~(Math.random() * 2) - 0){
          id = nodes[i].dataset.id + '';
          color = nodes[i].style.backgroundColor;
        }else{
          id = nodes[i + 1].dataset.id + '';
          color = nodes[i + 1].style.backgroundColor;
        }

        // set family-name
        nodes[i].dataset.id = id;
        nodes[i].style.backgroundColor = color;
        if(nodes[i + 1]){
          nodes[i + 1].dataset.id = id;
          nodes[i + 1].style.backgroundColor = color;
        }

        // birth new child
        if(Math.random() * 100 <= 0.0315){
          children.push({
            id: id,
            color: color
          });
        }

        // rest in peace
        if(Math.random() * 100 <= 0.129){
          deadmen.push({
            elm: nodes[i],
            id: id
          });
        }
        if(Math.random() * 100 <= 0.129){
          deadmen.push({
            elm: nodes[i + 1],
            id: id
          });
        }
      }

      // push new children into dom
      children.forEach(c => {
        let li = d.createElement('li');
        li.dataset.id = c.id;
        li.style.backgroundColor = c.color;
        nodes.push(li);

        d.querySelector('section#table ol')!.appendChild(li);

        let name = d.querySelector('#table ul li[data-id="' + c.id + '"] span')?.innerHTML + '';
        logging(logger.BIRTH, c.id, name);
      });

      // shift dead men/women from dom
      deadmen.forEach(c => {
        nodes.splice(1);

        d.querySelector('section#table ol')!.removeChild(c.elm);

        let name = d.querySelector('#table ul li[data-id="' + c.id + '"] span')?.innerHTML + '';
        logging(logger.DEAD, c.id, name);
      });

      // check extinct families
      let liveFamilyId_table = Array.from(new Map(Array.from(d.querySelectorAll('section#table ol li')).map(li=>[(li as HTMLElement).dataset.id,0])).keys()).sort();
      let lifeFamilyId_index = Array.from(d.querySelectorAll('section#table ul li')).filter(li=>li.querySelector('small')!.innerHTML!=='0').map(li=>(li as HTMLElement).dataset.id).sort();
      lifeFamilyId_index.filter(id => !liveFamilyId_table.includes(id)).forEach(id => {
        let name = d.querySelector('#table ul li[data-id="' + id + '"] span')?.innerHTML + '';
        logging(logger.EXTINCT, id + '', name);
      });

      // recalc indexes
      let max = 0;
      let total = 0;

      d.querySelectorAll('#table ul li')
      .forEach(idx => {
        let count = d.querySelectorAll('section#table ol li[data-id="' + (idx as HTMLElement).dataset.id + '"]').length;
        idx.querySelector('small')!.innerHTML = count + '';
        (idx as HTMLElement).dataset.tmpcnt = count + '';
        if(count > max) max = count;
        total += count;
      });

      d.querySelectorAll('#table ul li')
      .forEach(idx => {
        let rate = ~~(parseInt((idx as HTMLElement).dataset.tmpcnt + '') / max * 100);
        idx.querySelector('meter')!.value = rate;
        (idx as HTMLElement).style.order = (max - parseInt((idx as HTMLElement).dataset.tmpcnt + '')) + '';
        idx.removeAttribute('data-tmpcnt');
      });

      // remove empty indexes
      let parent_indexes = d.querySelector('section#table ul');

      d.querySelectorAll('#table ul li')
      .forEach(idx => {
        if(idx.querySelector('small')!.innerHTML.toString() === '0'){
          idx.removeChild(<HTMLElement>idx.querySelector('data'));
          idx.removeChild(<HTMLElement>idx.querySelector('span'));
          idx.removeChild(<HTMLElement>idx.querySelector('small'));
          idx.removeChild(<HTMLElement>idx.querySelector('meter'));
          parent_indexes!.removeChild(idx);
        }
      });

      parent_indexes = null;

      // reduce old notices
      parent_indexes = d.querySelector('section#table dl');

      for(let i = d.querySelectorAll('section#table dd[data-mode="3"]').length - 20; i > 0; i --){
        parent_indexes!.removeChild(<HTMLElement>Array.from(parent_indexes!.querySelectorAll('dd[data-mode="3"]')).pop());
      }

      parent_indexes = null;

      // increase generation
      let gen = parseInt(d.querySelector('#generation')!.innerHTML);
      d.querySelector('#generation')!.innerHTML = (isNaN(gen) ? 0 : gen) + 1 + '';

      // update population
      d.querySelector('#population')!.innerHTML = total + '';

      // reserve next generation
      if(d.querySelector('main')!.dataset.state === 'playing'){
        setTimeout(() => {
          start();
        }, 150);
      }

      mask_unset();
    }, 10);
  };


  /** onClick: button#stop */
  let stop = () => {
    // set state to pausing (temporary state for pause)
    d.querySelector('main')!.dataset.state = 'pausing';
  };


  /** onClick: button#init */
  let init = () => {
    mask_set();

    setTimeout(() => {
      // check init-data
      let txa_data = d.querySelector<HTMLTextAreaElement>('section#data textarea')!.value;
      if(!txa_data){
        mask_unset();
        alert('ERR_100: データが存在しません');
        return;
      }

      let defstr_data = txa_data.replace(/\r\n/g, '\n').replace(/\r/g, "\n").replace(/\n+/g, "\n").replace(/(^\n|\n$)/, '');
      if(!defstr_data){
        mask_unset();
        alert('ERR_101: データが存在しません');
        return;
      }


      // parse init-data
      let def_data: Array<Array<string | number>> = defstr_data.split("\n").map(arr => arr.split("\t"));
      for(let i = 0, l = def_data.length; i < l; i ++){
        if(def_data[i].length !== 2){
          mask_unset();
          alert('ERR_110: データの書式が正しくありません');
          return;
        }
        if(def_data[i][0] === ''){
          mask_unset();
          alert('ERR_111: データの名字が空欄です');
          return;
        }
        if(def_data[i][1] === ''){
          mask_unset();
          alert('ERR_112: データの件数が空欄です');
          return;
        }
        if(/[^0-9]/.test(def_data[i][1] + '')){
          mask_unset();
          alert('ERR_113: データの件数に数字以外の文字が含まれています');
          return;
        }

        def_data[i][0] = def_data[i][0] + ''; // name
        def_data[i][1] = ~~(def_data[i][1]); // count
        def_data[i][2] = i; // id
      }


      // set index-data
      let index_data: Array<{id: number, name: string, count: number, color: string}> = [];
      let index_max = 0;
      for(let i = 0, l = def_data.length; i < l; i ++){
        if(index_max < parseInt(def_data[i][1] + '')){
          index_max = parseInt(def_data[i][1] + '');
        }

        index_data.push({
          id: parseInt(def_data[i][2] + ''),
          name: def_data[i][0] + '',
          count: parseInt(def_data[i][1] + ''),
          color:
            '#'
            + (~~(Math.random() * 255)).toString(16).padStart(4, "0").substring(2, 4)
            + (~~(Math.random() * 255)).toString(16).padStart(4, "0").substring(2, 4)
            + (~~(Math.random() * 255)).toString(16).padStart(4, "0").substring(2, 4)
        });
      }


      // set list-data
      let node_data = [];
      for(let i = 0, l = def_data.length; i < l; i ++){
        for(let j = 0, m = parseInt(def_data[i][1] + ''); j < m; j ++){
          node_data.push({
            id: def_data[i][2],
            name: def_data[i][0],
            value: ~~(Math.random() * 1000000000) // sort-order
          });
        }
      }
      node_data.sort((a, b) => a.value - b.value);


      // clear dom
      if(d.querySelectorAll('section#table ol li').length !== 0){
        d.querySelectorAll('section#table ol li').forEach(li => {
          li.parentNode?.removeChild(li);
        });
      }
      if(d.querySelectorAll('section#table dl dd').length !== 0){
        d.querySelectorAll('section#table dl dd').forEach(dd => {
          dd.parentNode?.removeChild(dd);
        });
      }
      if(d.querySelectorAll('section#table ul li').length !== 0){
        d.querySelectorAll('section#table ul li').forEach(li => {
          li.parentNode?.removeChild(li);
        });
      }


      // set dom: table
      let parent_node = d.querySelector('section#table ol');

      node_data.forEach(dat => {
        let child_node = d.createElement('li');
        parent_node!.appendChild(child_node);
        child_node.setAttribute('data-id', dat.id + '');

        let tmp_index = index_data.filter(arr => arr.id === dat.id);
        if(tmp_index.length === 0){
          child_node.style.backgroundColor = '#0000';
        }else{
          child_node.style.backgroundColor = tmp_index[0].color;
        }
      });

      parent_node = null;


      // set dom: index
      parent_node = d.querySelector('section#table ul');

      index_data.forEach(dat => {
        let child_node = d.createElement('li');
        let color_node = d.createElement('data');
        let name_node = d.createElement('span');
        let name_text = d.createTextNode(dat.name);
        let count_node = d.createElement('small');
        let count_text = d.createTextNode(dat.count + '');
        let bar_node = d.createElement('meter');
        let bar_value = ~~(dat.count / index_max * 100);

        parent_node!.appendChild(child_node);
        child_node.appendChild(color_node);
        child_node.appendChild(name_node);
        name_node.appendChild(name_text);
        child_node.appendChild(count_node);
        count_node.appendChild(count_text);
        child_node.appendChild(bar_node);

        child_node.setAttribute('data-id', dat.id + '');
        color_node.style.backgroundColor = dat.color;
        bar_node.setAttribute('value', bar_value + '');
        bar_node.setAttribute('min', '0');
        bar_node.setAttribute('max', '100');
        bar_node.setAttribute('low', '0');
        bar_node.setAttribute('high', '50');
        bar_node.setAttribute('optimum', '50');
      });

      parent_node = null;

      // set dom: generation
      d.querySelector('b#generation')!.innerHTML = '1';

      // set dom: population
      let total = 0;
      d.querySelectorAll('#table ul li')
      .forEach(idx => {
        let count = d.querySelectorAll('section#table ol li[data-id="' + (idx as HTMLElement).dataset.id + '"]').length;
        total += count;
      });
      d.querySelector('#population')!.innerHTML = total + '';

      mask_unset();
    }, 10);
  };

  /** onLoad */
  d.addEventListener('DOMContentLoaded', load);
})(document);
