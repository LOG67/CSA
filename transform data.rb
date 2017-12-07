File.open("a.csv") do |f|
  a = f.readlines.map { |n| "\"" + n.split(',')[1].strip.tr('"', '') + "\": \"" +
      n.split(',')[0].strip + "\"\n"}.join(',')
  File.open("b.txt", 'w') {|w| w.write(a)}
end
