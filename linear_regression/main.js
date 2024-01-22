let data_x = []
let data_y = []
let m_optim = []
let c_optim = []

let m = undefined
let c = undefined
let step = undefined
let max_epochs = 1


let data_trace = {
		x: data_x,
		y: data_y,
    mode: 'markers',
    type: 'scatter',
    name: 'data'
}

  
fill_data_from_dom_inputs = function() {
	m = document.getElementsByName('m')[0].value
	c = document.getElementsByName('c')[0].value
	step = document.getElementsByName('lr')[0].value
  max_epochs = document.getElementsByName('max-epochs')[0].value
  
  console.log('m = ' + m)
  console.log('c = ' + c)
  console.log('lr = ' + c)

	let data_x_str = document.getElementsByName('data_x')[0].value.split(',')
	let data_y_str = document.getElementsByName('data_y')[0].value.split(',')
  
  for(let i=0; i<data_x_str.length; i++)
  {
  	data_x.push(Number(data_x_str[i]))
    data_y.push(Number(data_y_str[i]))
  }
  
  console.log(data_x, data_y)
}

lin_model = function(x,m,c) {
	return m * x + c // y
}


run_linear_regression = function() {
	console.log('Running Regression . .. ')

  //for (let epochs=0; epochs<2000; epochs++) {
    let diff_m = 0
    let diff_c = 0
    for(let i=0; i<data_x.length; i++) {
      y_hat = lin_model(data_x[i], m, c)
      error = y_hat - data_y[i]

      diff_m += (2 * error * data_x[i]);
      diff_c += (2 * error)
    }
    m = m - step * diff_m
    c = c - step * diff_c
    console.log('m = ' + m)
    console.log('c = ' + c)
 // }
 
 	m_optim.push(m)
  c_optim.push(c)
 
  x_for_pred = [0, 10]
  y_pred = [lin_model(x_for_pred[0], m, c), lin_model(x_for_pred[1], m, c)]
  
  pred_trace = {
  	x: x_for_pred,
    y: y_pred,
    name: 'prediction line'
  }
 
  let plot_traces = [data_trace, pred_trace]
  let m_c_trace = [ {x: m_optim, y: c_optim, mode: 'markers',} ]
  let m_c_layout = { xaxis: {range: [-5, 5]}, yaxis: {range: [-5, 5]} }
 	Plotly.newPlot('plot-id', plot_traces)
  Plotly.newPlot('m-c-plot', m_c_trace, m_c_layout)
 
 	if(max_epochs > 0) {
 		setTimeout(run_linear_regression, 100)
    max_epochs -= 1
  }
  
}

let run_stub = function() {
	fill_data_from_dom_inputs()
  run_linear_regression()
}


document.getElementById("run-button").addEventListener("click", run_stub); 

