Python SEO Analyzer + micro node api
===================

[![Googling Google by taleas.com](https://www.taleas.com/static/images/comics/googling-google.jpg "Googling Google by taleas.com")](https://www.taleas.com/comics/googling-google.html)

An SEO tool that analyzes the structure of a site, crawls the site, counts words in the body of the site and warns of any technical SEO issues.

Requires Python 3.6+, BeautifulSoup4 and urllib3.

### Node api 

[MT] I take no credit for the original python-seo-analyzer, just made it easier to implement it as a µservice

Usage:

```
docker pull michaeltiel/python-seo-analyzer
docker run -p 3000:3000 michaeltiel/python-seo-analyzer
```

It opens up a node api with a single endpoint that accepts a json body accepting two properties:
domain (required) and sitemap (optional)

```
{
 "domain": "https://tiel.dev/", 
 "sitemap": "sitemap.xml"
}
```

This will return

```
{
    "pages": [
        {
            "url": "https://tiel.dev",
            "title": "home - tiel.dev",
            "description": ...
 
```



From original repo installation
------------

### PIP

```
pip3 install pyseoanalyzer
```

### Docker

```
docker run sethblack/python-seo-analyzer [ARGS ...]
```

Command-line Usage
------------------

If you run without a sitemap it will start crawling at the homepage.

```sh
seoanalyze http://www.domain.com/
```

Or you can specify the path to a sitmap to seed the urls to scan list.

```sh
seoanalyze http://www.domain.com/ --sitemap path/to/sitemap.xml
```

HTML output can be generated from the analysis instead of json.

```sh
seoanalyze http://www.domain.com/ --output-format html
```

API
---

The `analyze` function returns a dictionary with the results of the crawl.

```python
from seoanalyzer import analyze

output = analyze(site, sitemap)

print(output)
```

In order to analyze heading tags (h1-h6) and other extra additional tags as well, the following options can be passed to the `analyze` function
```python
from seoanalyzer import analyze

output = analyze(site, sitemap, analyze_headings=True, analyze_extra_tags=True)

print(output)
```

By default, the `analyze` function analyzes all the existing inner links as well, which might be time consuming.
This default behaviour can be changed to analyze only the provided URL by passing the following option to the `analyze` function
```python
from seoanalyzer import analyze

output = analyze(site, sitemap, follow_links=False)

print(output)
```

Alternatively, you can run the analysis as a script from the seoanalyzer folder.

```sh
python analyzer.py https://www.sethserver.com/ -f html > results.html
```

Notes
-----

If you get `requests.exceptions.SSLError` at either the command-line or via the python-API, try using:
 - http://www.foo.bar
 
 **instead** of..
 
 -  https://www.foo.bar
