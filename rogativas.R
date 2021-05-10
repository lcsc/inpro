
#' @author
#' Fergus Reig Gracia \url{http://fergusreig.es}; Environmental Hydrology, Climate and Human Activity Interactions, Geoenvironmental Processes, IPE, CSIC \url{http://www.ipe.csic.es/hidrologia-ambiental}
#'
#' @details
#' \tabular{ll}{
#'   Version: \tab 1.0.0\cr
#'   License: \tab GPL version 3 or newer\cr
#' }
#'
#' @description
#' Preparar datos para usarlos online

# Ruta pruebas
# http://fergus-ssd/fergus/rogativas

# setwd("/mnt/disco/ficheros/ipe/public_html/rogativas")

# Leemos el fichero linea a linea
data = readLines("rogativas_propluvia.csv")

# Borramos la primera línea (que es el nombre de las columnas)
data = data[-1]

# Algunas líneas están rotas, las pegamos (esto pasaba en el caso concreo del primer fichero que me pasaste... podría no pasar o podrían pasar otras cosas)
is = rev(which(grepl("491–522.$", data)))
i = is[1]
for (i in is){
	data[i] = paste(data[i], data[i+1])
	data = data[-(i+1)]
}

# Dejamos solo un tipo de comillas para evitar problemas
data = gsub('"', "'", data)

# data = gsub('í', "i", data)

data = gsub(';Spring;', ";;3", data) # 3, 4, 5
data = gsub(';Winter;', ";;1", data) # 12, 1, 2
data = gsub(';Autumn;', ";;9", data) # 9, 10, 11
data = gsub(';Summer;', ";;6", data) # 6, 7, 8

data = gsub(';spring;', ";;3", data) # 3, 4, 5
data = gsub(';winter;', ";;1", data) # 12, 1, 2
data = gsub(';autumn;', ";;9", data) # 9, 10, 11
data = gsub(';summer;', ";;6", data) # 6, 7, 8

for(i in 1:(length(data)-1)){
	data[i] = paste0(data[i], " ")
	data[i] = paste0(data[i], "\\")
	data[i] = paste0(data[i], "n")
	data[i] = paste0(data[i], "\\")
}

# Ponemos texto al principio y al final, para que sea la definción de una variable
data[1] = paste0('var data = "', data[1])
data[length(data)] = paste0(data[length(data)], '";')

# Escribimos el dichero data.js
writeLines(data, "data.js")


# # var myText = "Este es un texto muy largo que queremos \
# #               formatear en varias líneas. Un trozo de HTML \
# #               también sería un buen ejemplo de la necesidad \
# #               de asignar texto de varias líneas en una variable.";


# Fichero data.js
# "491–522.
# "
# "491–522. "

# Sustituir:
# "
# '

# Sustituir:
# \n
#  \\n \\\n 

# Sustituir:
# "  "
# " "

# Sustituir:
# "\n "
# "\n"

# Sustituir:
# "\n \"
# "\n\"