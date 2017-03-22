//d3 Line Graph object
import * as d3 from 'd3';


const d3LineGraph = {

  svg: null,

  g: null,

  create(el, properties, state) {

    const margin = properties;
        
    const width = 900;
    const height = 400;

    this.svg = d3.select(el).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const widthHeight = { width, height };

    this.renderAxis(this.g, widthHeight, state);
  },

  xScale: null,

  yScale: null,

  update(state) {

    this.renderDomainLines(state.selectedDomains);
  },


  renderAxis(el, properties, data) {
    const startDate = data.startDate;
    const endDate = data.endDate;
    const min = data.min;
    const max = data.max;

    // [year-month-day]
    const minDate = new Date(endDate.year, endDate.month - 1, endDate.day);
    const maxDate = new Date(startDate.year, startDate.month - 1, startDate.day);

    this.xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, properties.width]);

    this.yScale = d3.scaleLinear()
      .domain([min, max])
      .range([properties.height, 0]);

    const xAxis = d3.axisBottom(this.xScale)
      .tickFormat(d3.timeFormat('%Y-%m-%d'));

    const yAxis = d3.axisLeft(this.yScale);

    // add x axis
    el.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + properties.height + ')')
      .call(xAxis)

    // add y axis
    el.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // return xAxis, yAxis
    // return { xScale, yScale }
    
  },

  domainCount: [2, 1, 0],

  renderDomainLines(data) {

    const xScale = this.xScale;
    const yScale = this.yScale;

    const parseDate = d3.timeFormat('%d-%m-%Y');

    const domainLine = d3.line()
            .x((d) => {
              return xScale(new Date(d.date));
             })
            .y((d) => {
              return yScale(d.count);
            });

    const domainStyling = {
      0: '#909BBD',
      1: '#8DB8CB',
      2: '#DAB4C6'
    }

    data.forEach((domain, index) => {

      for (let domainName in domain) {

        let domainCount = this.domainCount.pop()

        let domainColor = domainStyling[domainCount];

        this.g.append('path')
          .attr('id', 'domain-line-' + domainCount)
          .style("stroke", domainColor)
          .style("fill", 'none')
          .style("stroke-width", '2px')
          .attr('d', domainLine(domain[domainName]));

        this.g.selectAll('domainDots-' + domainCount)
          .data(domain[domainName])
            .enter().append('circle')
              .attr('class', 'domain-circle-' + domainCount)
              .attr('r', 6)
              .attr('cx', (d) => { return xScale(new Date(d.date)); })
              .attr('cy', (d) => { return yScale(d.count); })
              .style('fill', domainColor)
      }
    });


  },

  destroy() {
    this.domainCount = [2, 1, 0];
    this.svg.remove();
  },

}

export default d3LineGraph;