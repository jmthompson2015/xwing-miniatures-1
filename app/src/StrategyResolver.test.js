import HumanAgentStrategy from "./HumanAgentStrategy.js";
import MediumAgentStrategy from "./MediumAgentStrategy.js";
import SimpleAgentStrategy from "./SimpleAgentStrategy.js";
import StrategyResolver from "./StrategyResolver.js";

QUnit.module("StrategyResolver");

QUnit.test("resolveStrategy()", assert => {
  assert.equal(StrategyResolver.resolveStrategy("HumanAgentStrategy"), HumanAgentStrategy);
  assert.equal(StrategyResolver.resolveStrategy("MediumAgentStrategy"), MediumAgentStrategy);
  assert.equal(StrategyResolver.resolveStrategy("SimpleAgentStrategy"), SimpleAgentStrategy);

  assert.equal(StrategyResolver.resolveStrategy("ReallyStupidStrategy"), undefined);
});

const StrategyResolverTest = {};
export default StrategyResolverTest;
