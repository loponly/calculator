import React from "react";
import "./App.css";

const defaultState = {
  calcScreen: "0",
  calcOperation: "",
  isEqual: false,
};

const endWithOperator = /[*+-/]$/;
const endWithMinus = /\d{1,}[*+/]-$/;
const doubleOperation = /\d{1,}[*+-/][*+-/]$/;

const OPERATIONS = { "+": "+", "−": "-", x: "*", "/": "/" };
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.onClickValue = this.onClickValue.bind(this);
  }

  onClickValue(event) {
    const value = event.target.innerText;

    if (value === "C") {
      this.setState(defaultState);
    } else if (["+", "−", "x", "/"].includes(value)) {
      if (this.state.isEqual) {
        this.setState({
          calcOperation: this.state.calcScreen + OPERATIONS[value],
          isEqual: false,
          calcScreen: "",
        });
      } else {
        let screen = this.state.calcOperation + this.state.calcScreen;
        this.setState({
          calcScreen: "",
          calcOperation: screen.match(endWithOperator)
            ? (screen + OPERATIONS[value]).match(endWithMinus)
              ? screen + OPERATIONS[value]
              : screen.match(doubleOperation)
              ? this.state.calcOperation.slice(
                  0,
                  this.state.calcOperation.length - 2
                ) + OPERATIONS[value]
              : this.state.calcOperation.slice(
                  0,
                  this.state.calcOperation.length - 1
                ) + OPERATIONS[value]
            : screen + OPERATIONS[value],
        });
      }
    } else if (
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(value)
    ) {
      if (this.state.calcScreen === "0" || this.state.isEqual) {
        this.setState({
          calcScreen: value,
        });
        if (this.state.isEqual) {
          this.setState({ calcOperation: "", isEqual: false });
        }
      } else {
        this.setState({
          calcScreen: this.state.calcScreen + value,
        });
      }
    } else if ("." === value && this.state.calcScreen.search("\\.") < 0) {
      this.setState({
        calcScreen: this.state.calcScreen + value,
      });
    } else if ("=" === value && this.state.calcOperation) {
      try {
        this.setState({
          calcScreen: eval(this.state.calcOperation + this.state.calcScreen),
          calcOperation:
            this.state.calcOperation +
            this.state.calcScreen +
            value +
            eval(this.state.calcOperation + this.state.calcScreen),
          isEqual: true,
        });
      } catch (error) {
        this.setState({
          calcScreen: "NaN",
          calcOperation: "",
        });
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="calc-body">
          <div className="calc-screen">
            <div className="calc-operation">{this.state.calcOperation}</div>
            <div className="calc-typed" id="display">
              {this.state.calcScreen}
              {/* <span className="blink-me">_</span> */}
            </div>
          </div>
          <div className="calc-button-row">
            <div className="button c" onClick={this.onClickValue} id="clear">
              C
            </div>
            <div className="button l">≠</div>
            <div className="button l">%</div>
            <div className="button l" onClick={this.onClickValue} id="divide">
              /
            </div>
          </div>
          <div className="calc-button-row">
            <div className="button" onClick={this.onClickValue} id="seven">
              7
            </div>
            <div className="button" onClick={this.onClickValue} id="eight">
              8
            </div>
            <div className="button" onClick={this.onClickValue} id="nine">
              9
            </div>
            <div className="button l" onClick={this.onClickValue} id="multiply">
              x
            </div>
          </div>
          <div className="calc-button-row">
            <div className="button" onClick={this.onClickValue} id="four">
              4
            </div>
            <div className="button" onClick={this.onClickValue} id="five">
              5
            </div>
            <div className="button" onClick={this.onClickValue} id="six">
              6
            </div>
            <div className="button l" onClick={this.onClickValue} id="subtract">
              −
            </div>
          </div>
          <div className="calc-button-row">
            <div className="button" onClick={this.onClickValue} id="one">
              1
            </div>
            <div className="button" onClick={this.onClickValue} id="two">
              2
            </div>
            <div className="button" onClick={this.onClickValue} id="three">
              3
            </div>
            <div className="button l" onClick={this.onClickValue} id="add">
              +
            </div>
          </div>
          <div className="calc-button-row">
            <div className="button" onClick={this.onClickValue} id="decimal">
              .
            </div>
            <div className="button" onClick={this.onClickValue} id="zero">
              0
            </div>
            <div className="button">
              <span>&#177;</span>
            </div>
            <div className="button l" onClick={this.onClickValue} id="equals">
              =
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
