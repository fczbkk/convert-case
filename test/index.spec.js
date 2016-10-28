import convertCase from './../src/';


const data = {
  human: 'aaa bbb ccc',
  camel: 'aaaBbbCcc',
  pascal: 'AaaBbbCcc',
  upper: 'AAA_BBB_CCC',
  kebab: 'aaa-bbb-ccc'
};


describe('Convert case', function () {

  it('should convert between any cases', function () {
    Object.keys(data).forEach(source => {
      Object.keys(data).forEach(target => {
        expect(convertCase(data[source], source, target))
          .toEqual(data[target], source + '->' + target);
      })
    });
  });

  it('should return non-string unchanged', function () {
    expect(convertCase(123, 'human', 'kebab')).toEqual(123);
  });

  it('should return unchanged on invalid source case', function () {
    expect(convertCase('aaa bbb', 'xxx', 'kebab')).toEqual('aaa bbb');
  });

  it('should return unchanged on invalid target case', function () {
    expect(convertCase('aaa bbb', 'human', 'xxx')).toEqual('aaa bbb');
  });

});
