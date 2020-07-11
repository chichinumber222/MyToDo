class WorkWithDate {
  constructor(...values) {
    this.data = values;
  }

  format() {
    this.data = this.data.map((element) => {
      let elementNum = Number(element);
      if (elementNum !== elementNum || elementNum < 0) elementNum = 0;
      return Math.round(elementNum);
    });
    return this;
  }

  recountMinuteSecond() {
    const [min, sec] = this.data;
    this.data = sec >= 60 ? [Math.floor(sec / 60) + min, sec % 60] : [min, sec];
    return this;
  }

  transformToText() {
    this.data = this.data
      .map((element) => {
        if (String(element).length < 1) return `00`;
        if (String(element).length < 2) return `0${element}`;
        return element;
      })
      .join(':');
    return this;
  }

  result() {
    return this.data;
  }
}

export default WorkWithDate;
