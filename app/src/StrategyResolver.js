import HumanAgentStrategy from "./HumanAgentStrategy.js";
import MediumAgentStrategy from "./MediumAgentStrategy.js";
import SimpleAgentStrategy from "./SimpleAgentStrategy.js";

const StrategyResolver = {};

StrategyResolver.clearInputArea = inputAreaId => ReactDOM.render(ReactDOMFactories.span(""), document.getElementById(inputAreaId));

StrategyResolver.resolveStrategy = strategyName =>
   R.cond([
    [R.equals("HumanAgentStrategy"), R.always(HumanAgentStrategy)],
    [R.equals("MediumAgentStrategy"), R.always(MediumAgentStrategy)],
    [R.equals("SimpleAgentStrategy"), R.always(SimpleAgentStrategy)],
    [R.T, name => console.error("Unknown agent strategy " + name)]
   ])(strategyName);

Object.freeze(StrategyResolver);

export default StrategyResolver;