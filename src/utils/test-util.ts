// reference: https://github.com/vercel/next.js/issues/47131

// @ts-expect-error Parameter 'name' implicitly has an 'any' type.ts(7006)
export async function resolvedComponent<T>(Component, props: T) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}
