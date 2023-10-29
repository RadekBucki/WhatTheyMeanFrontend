import {act, renderHook} from '@testing-library/react'
import useSentimentIdsRepository from '../../src/hooks/useSentimentIdsRepository';
beforeEach(() => {
  // @ts-ignore
  localStorage.clear();
});
describe('useSentimentIdsRepository', () => {
  it('should add sentiment IDs', () => {
    const {result} = renderHook(() => useSentimentIdsRepository());

    expect(result.current.getAll()).toHaveLength(0);

    act(() => {
      result.current.add('1');
    });

    expect(result.current.getAll()).toEqual(['1']);

    act(() => {
      result.current.add('2');
    });

    expect(result.current.getAll()).toEqual(['1', '2']);
  });

  it('should remove sentiment IDs', () => {
    const {result} = renderHook(() => useSentimentIdsRepository());

    expect(result.current.getAll()).toHaveLength(0);

    act(() => {
      result.current.add('1');
      result.current.add('2');
    });

    expect(result.current.getAll()).toEqual(['1', '2']);

    act(() => {
      result.current.remove('1');
    });

    expect(result.current.getAll()).toEqual(['2']);
  });

  it('should persist data in localStorage', () => {
    const {result, rerender} = renderHook(() => useSentimentIdsRepository());

    act(() => {
      result.current.add('1');
    });

    expect(result.current.getAll()).toEqual(['1']);

    rerender();

    expect(result.current.getAll()).toEqual(['1']);

    act(() => {
      result.current.remove('1');
    });

    expect(result.current.getAll()).toEqual([]);

    rerender();

    expect(result.current.getAll()).toEqual([]);
  });
});
