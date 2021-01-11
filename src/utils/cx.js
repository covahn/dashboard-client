const cx = (fixedClassed, config) => {
  try {
    if (typeof fixedClassed === 'object') {
      config = fixedClassed
      fixedClassed = ''
    }

    const conditionalClassNames = Object.entries(config).reduce(
      (className, [name, condition]) => {
        className = `${className} ${condition ? '' : '@'}${name}`
        return className
      },
      ''
    )

    return `${conditionalClassNames} ${fixedClassed}`
  } catch (e) {
    console.log('classNames error')
  }
}

export default cx
