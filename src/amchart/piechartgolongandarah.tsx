import { Component, createSignal, onCleanup, onMount } from 'solid-js';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";

const PieChartShare: Component = () => {
  const [legendList, setLegendList] = createSignal([]);
  let divRef: any;
  let rootRef: any;

  onCleanup(() => {
    if (rootRef) {
      rootRef.dispose();
    }
  });

  onMount(() => {
    const legend = [
      { name: 'A', color: '#41CFC6', field: 'A' },
      { name: 'B', color: '#FF6847', field: 'B' },
      { name: 'AB', color: '#FFAB47', field: 'AB' },
      { name: 'O', color: '#47CFFF', field: 'O' },
    ];
    setLegendList(legend);
    fetchDataAndCreateChart();
  });

  const fetchDataAndCreateChart = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/blood_type_counts');
      const data = await response.json();
      const bloodTypeData = data['Golongan darah'].map(item => ({
        category: item.blood_type,
        value: item.count
      }));
      createChart(bloodTypeData);
    } catch (error) {
      console.error("Error fetching blood type data:", error);
    }
  };

  const createChart = (data) => {
    let root = am5.Root.new(divRef);
    rootRef = root;

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      })
    );

    let series = chart.series.push(am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{category}: {value}"
      })
    }));

    series.data.setAll(data);

    series.slices.template.setAll({
      cornerRadius: 5,
      stroke: am5.color(0xffffff),
      strokeWidth: 2
    });

    series.slices.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.slices.indexOf(target));
    });

    series.slices.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors").getIndex(series.slices.indexOf(target));
    });

    chart.appear(1000, 100);
  };

  return (
    <div ref={divRef} style={{ width: '40vw', height: '25vh', margin: '-1vw' }}></div>
  );
}

export default PieChartShare;
