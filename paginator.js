class Paginator
{
    constructor(options)
    {
        if(options)
        {
            Object.keys(options).forEach(key => 
            {
                this[key] = options[key];
            });
        }
    }

    /**
     * Create array of pagination link labels
     * 
     * Credit goes to https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
     */
    pagination(c, m) 
    {
        var current = c,
            last = m,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        for (let i = 1; i <= last; i++) {
            if (i == 1 || i == last || i >= left && i < right) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    }

    render()
    {
        let markup = ``;
        if(this.total > 0)
        {
            var paginationFirstPage = `<li ${this.current_page == 1 ? "class='disabled'" : "class='enabled'" }><a href="${this.current_page == 1 ? "#" : this.path + '?page=1'}"><i class='fa fa-angle-double-left'></i></a></li>`;
            var paginationLastPage = `<li ${this.current_page == this.last_page ? "class='disabled'" : "class='enabled'" }><a href="${this.current_page == this.last_page ? "#" : this.path + `?page=${this.last_page}`}"><i class='fa fa-angle-double-right'></i></a></li>`;
            var paginationNextPage = `<li ${this.current_page == this.last_page ? "class='disabled'" : "class='enabled'" }><a href="${this.current_page == this.last_page ? "#" : this.next_page_url}"><i class='fa fa-angle-right'></i></a></li>`;
            var paginationPreviousPage = `<li ${this.prev_page_url != null ? "class='enabled'" : "class='disabled'" }><a href="${this.prev_page_url != null ? this.prev_page_url : '#'}"><i class='fa fa-angle-left'></i></a></li>`;

            var paginationItemsMarkup = "";

            for (var range of pagination(this.current_page, this.last_page))
            {
                var cls = "";
                var href= "";

                if(range == this.current_page)
                {
                    cls = "active";
                    href = '#';
                }
                else
                {
                    cls = range == "..." ? "disabled" : "enabled";
                    href = range == "..." ? "#" : this.path + `?page=${range}`;
                }

                var itemMarkup = `<li class="${cls}"><a href="${href}">${range}</a></li>`;

                paginationItemsMarkup += itemMarkup;
            }

            markup = "<ul class='pagination raised'>" + paginationFirstPage + paginationPreviousPage + paginationItemsMarkup + paginationNextPage + paginationLastPage + "</ul>";
        }

        return markup;
    }
}
